import styled from "styled-components"
import React, { useEffect, useRef, useState } from "react"
import { Howl, Howler } from "howler"

type TrackProps = {
  track: string
  isPlaying: boolean
  title: string
  region: { start: number; end: number }
  duration: number
}

export const Track: React.FC<TrackProps> = ({
  track,
  isPlaying,
  title,
  region,
  duration,
}) => {
  const [volume, setVolume] = useState(0.5)
  const [pan, setPan] = useState(0)
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    // Create Howl instance when component mounts and region exists
    if (region && region.start !== undefined && region.end !== undefined) {
      let loopSection: [number, number, boolean]
      if (region.start === region.end) {
        loopSection = [region.start, duration * 1000 - region.start, true]
      } else {
        loopSection = [region.start, region.end - region.start, true]
      }
      soundRef.current = new Howl({
        src: [track],
        volume: volume,
        sprite: {
          loop: loopSection,
        },
      })
      const updateProgressMarker = () => {
        if (soundRef.current) {
          const currentTime = soundRef.current.seek() // Get the current playback position
        }

        // Update the position of the progress marker on your UI
        // For example:
        // progressMarker.style.left = `${(currentTime / sound.duration()) * 100}%`;
      }
      soundRef.current.on("play", () => {
        setInterval(updateProgressMarker, 500) // Update marker position every second
      })
      return () => {
        // Cleanup: stop and unload the sound when component unmounts
        soundRef.current && soundRef.current.unload()
      }
    }
  }, [region]) // Listen for changes in the region prop

  useEffect(() => {
    // Update volume when the volume state changes
    soundRef.current && soundRef.current.volume(volume)
  }, [volume])

  useEffect(() => {
    // Update stereo (pan) when the pan state changes
    soundRef.current && soundRef.current.stereo(pan)
  }, [pan])

  useEffect(() => {
    // Play or pause the sound based on the isPlaying state
    if (soundRef.current) {
      isPlaying ? soundRef.current.play("loop") : soundRef.current.pause()
    }
  }, [isPlaying])
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  const handlePan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPan(parseFloat(e.target.value))
  }

  return (
    <StyledTrack>
      <h4>{title}</h4>

      <FaderWrapper>
        <StyledFader
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolume}
          type="range"
          value={volume}
        />
      </FaderWrapper>

      <StyledPanWrapper>
        <StyledPan
          min={-1}
          max={1}
          step={0.01}
          value={pan}
          onChange={handlePan}
          type="range"
        />
      </StyledPanWrapper>
    </StyledTrack>
  )
}

const StyledTrack = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #d8d8d8;
  h4 {
  }
  label {
    font-size: 14px;
    margin-top: -20px;
  }
`

const FaderWrapper = styled.div`
  height: 100%;
  display: flex;
`

const StyledFader = styled.input`
  -webkit-appearance: none;
  appearance: none;
  height: 2px;

  position: absolute;
  background-color: #340e0e;
  pointer-events: none;
  left: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) rotate(-90deg);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    width: 1.55rem;
    height: 0.95rem;
    background-color: #fff8f8;
    box-shadow: 11px 8px 12px -11px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 11px 8px 12px -11px rgba(0, 0, 0, 1);
    -moz-box-shadow: 11px 8px 12px -11px rgba(0, 0, 0, 1);

    cursor: pointer;
    position: relative;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    width: 1.55rem;
    height: 0.95rem;
    background-color: #fff8f8;
    box-shadow: 11px 8px 12px -11px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 11px 8px 12px -11px rgba(0, 0, 0, 1);
    -moz-box-shadow: 11px 8px 12px -11px rgba(0, 0, 0, 1);

    cursor: pointer;
    position: relative;
  }
`

const StyledPanWrapper = styled.div`
  position: relative;
  width: 100%;

  height: 20px;
  display: flex;
  justify-content: center;
`
const StyledPan = styled.input`
  width: 100px;
  appearance: none;
  height: 2px;

  position: absolute;

  background-color: black;
  pointer-events: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    width: 0.45rem;
    height: 1.25rem;
    background-color: #5f5f5f;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    width: 0.45rem;
    height: 1.25rem;
    background-color: #9b7979;
    box-shadow: -1px -1px 12px -5px rgba(0, 0, 0, 1);
    -webkit-box-shadow: -1px -1px 12px -5px rgba(0, 0, 0, 1);
    -moz-box-shadow: -1px -1px 12px -5px rgba(0, 0, 0, 1);
    cursor: pointer;
  }
`
