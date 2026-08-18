#!/usr/bin/env python3
"""
Progressive speed-up audio processor.
Starts slow, ramps up to a target speed across the duration of the clip.
Usage: python progressive_speed.py input.mp3 output.mp3 [--start 0.5] [--end 2.0] [--segments 10]
"""

import subprocess
import os
import sys
import argparse
import tempfile
import shutil

def get_duration(filepath):
    """Get audio duration in seconds using ffprobe."""
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", filepath],
        capture_output=True, text=True
    )
    return float(result.stdout.strip())

def build_atempo_chain(speed):
    """
    ffmpeg's atempo filter only accepts values between 0.5 and 2.0.
    For speeds outside that range, chain multiple atempo filters.
    e.g. 3.0x = atempo=2.0,atempo=1.5
         0.25x = atempo=0.5,atempo=0.5
    """
    filters = []
    s = speed
    if s > 1.0:
        while s > 2.0:
            filters.append("atempo=2.0")
            s /= 2.0
        filters.append(f"atempo={s:.4f}")
    elif s < 1.0:
        while s < 0.5:
            filters.append("atempo=0.5")
            s /= 0.5
        filters.append(f"atempo={s:.4f}")
    else:
        filters.append("atempo=1.0")
    return ",".join(filters)

def process_segment(input_file, output_file, start, duration, speed):
    """Extract a segment and apply speed change."""
    atempo = build_atempo_chain(speed)
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start),
        "-t", str(duration),
        "-i", input_file,
        "-filter:a", atempo,
        "-vn",
        output_file
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  Warning: ffmpeg error on segment: {result.stderr[-300:]}")
    return result.returncode == 0

def concat_segments(segment_files, output_file):
    """Concatenate all processed segments into one file."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
        for seg in segment_files:
            f.write(f"file '{seg}'\n")
        list_file = f.name

    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", list_file,
        "-c", "copy",
        output_file
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    os.unlink(list_file)

    if result.returncode != 0:
        # If copy fails, try re-encoding
        cmd[-2] = "aac"  # fallback encoder
        result = subprocess.run(cmd, capture_output=True, text=True)

    return result.returncode == 0

def progressive_speed(input_file, output_file, start_speed=0.5, end_speed=2.0, num_segments=10):
    """Main function: split audio into segments with increasing speed."""

    if not os.path.exists(input_file):
        print(f"Error: Input file '{input_file}' not found.")
        sys.exit(1)

    print(f"\n🎵 Progressive Speed Processor")
    print(f"   Input:    {input_file}")
    print(f"   Output:   {output_file}")
    print(f"   Speed:    {start_speed}x → {end_speed}x")
    print(f"   Segments: {num_segments}")
    print()

    total_duration = get_duration(input_file)
    print(f"   Duration: {total_duration:.2f}s")
    print()

    # Determine segment sizes in original time
    seg_duration = total_duration / num_segments

    tmpdir = tempfile.mkdtemp()
    segment_files = []

    try:
        for i in range(num_segments):
            # Linear interpolation of speed across segments
            t = i / (num_segments - 1) if num_segments > 1 else 0
            speed = start_speed + t * (end_speed - start_speed)

            start_time = i * seg_duration
            actual_duration = min(seg_duration, total_duration - start_time)

            out_seg = os.path.join(tmpdir, f"seg_{i:03d}.aac")
            segment_files.append(out_seg)

            print(f"   Segment {i+1:2d}/{num_segments}  "
                  f"[{start_time:.1f}s–{start_time+actual_duration:.1f}s]  "
                  f"speed={speed:.2f}x  ", end="", flush=True)

            ok = process_segment(input_file, out_seg, start_time, actual_duration, speed)
            print("✓" if ok else "✗")

        print(f"\n   Concatenating {num_segments} segments...")
        ok = concat_segments(segment_files, output_file)

        if ok and os.path.exists(output_file):
            out_dur = get_duration(output_file)
            print(f"   ✅ Done! Output duration: {out_dur:.2f}s (was {total_duration:.2f}s)")
            print(f"   Saved to: {output_file}\n")
        else:
            print("   ❌ Concatenation failed.")

    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Progressive audio speed-up")
    parser.add_argument("input",  help="Input audio file (mp3, wav, aac, m4a, etc.)")
    parser.add_argument("output", help="Output audio file")
    parser.add_argument("--start",    type=float, default=0.5,  help="Starting speed (default 0.5x = half speed)")
    parser.add_argument("--end",      type=float, default=2.0,  help="Ending speed   (default 2.0x = double speed)")
    parser.add_argument("--segments", type=int,   default=10,   help="Number of segments (more = smoother ramp, default 10)")
    args = parser.parse_args()

    progressive_speed(args.input, args.output,
                      start_speed=args.start,
                      end_speed=args.end,
                      num_segments=args.segments)
