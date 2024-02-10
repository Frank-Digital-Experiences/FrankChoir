import styled from "styled-components"
import React, { useEffect, useRef, useState } from "react"
import { Howl, Howler } from "howler"
import trackBG from "../../public/images/track.png"
import FaderBig from "../../public/images/stort-reglage 1.png"
import FaderSmall from "../../public/images/litet-reglage 1.png"

type TrackProps = {
  track: string
  isPlaying: boolean
  title: string
  region: { start: number; stop: number }
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
    if (region && region.start !== undefined && region.stop !== undefined) {
      let loopSection: [number, number, boolean]
      if (region.start === region.stop) {
        loopSection = [region.start, duration * 1000 - region.start, true]
      } else {
        loopSection = [region.start, region.stop - region.start, true]
      }
      soundRef.current = new Howl({
        src: [track],
        volume: volume,
        sprite: {
          loop: loopSection,
        },
      })
      // const updateProgressMarker = () => {
      //   if (soundRef.current) {
      //     const currentTime = soundRef.current.seek() // Get the current playback position
      //   }

      //   // Update the position of the progress marker on your UI
      //   // For example:
      //   // progressMarker.style.left = `${(currentTime / sound.duration()) * 100}%`;
      // }
      // soundRef.current.on("play", () => {
      //   setInterval(updateProgressMarker, 500) // Update marker position every second
      // })
      // return () => {
      //   // Cleanup: stop and unload the sound when component unmounts
      //   soundRef.current && soundRef.current.unload()
      // }
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
    <StyledTrack
      style={{
        backgroundImage: `url(${trackBG.src})`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <h4>{title}</h4>

      <FaderWrapper>
        <StyledFader
          backgroundImage={FaderBig}
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
          backgroundImage={FaderSmall}
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

export const StyledTrack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  margin: 0;
  padding: 0;
  aspect-ratio: 200 / 530;
  overflow: hidden;
  h4 {
    font-family: "Roboto Mono";
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 2px white;
    margin-top: 40px;
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

type BackgroundProps = {
  backgroundImage: any
}

const StyledFader = styled.input<BackgroundProps>`
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 190%;

  position: absolute;
  background-color: transparent;

  pointer-events: none;
  left: 0;
  left: 50%;
  top: 46.5%;
  transform: translateX(calc(-50% - 2px)) rotate(-90deg);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    width: 100px;
    height: 200px;
    background: transparent;

    background-image: ${(props) => `url("${props.backgroundImage.src}")`};
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: revert;

    transform: rotate(90deg);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    width: 100px;
    height: 200px;
    background: transparent;

    background-image: ${(props) => `url("${props.backgroundImage.src}")`};
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: revert;

    transform: rotate(90deg);
    cursor: pointer;
  }
`

const StyledPanWrapper = styled.div`
  position: relative;
  width: 100%;

  height: 20px;
  display: flex;
  justify-content: center;
`
const StyledPan = styled.input<BackgroundProps>`
  width: 100px;
  appearance: none;
  height: 2px;

  position: absolute;
  background-color: transparent;
  margin-top: -25%;
  pointer-events: none;

  width: 115%;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    background-color: transparent;
    width: 90px;
    height: 70px;

    border-radius: 0;
    background-image: ${(props) => `url("${props.backgroundImage.src}")`};
    background-position: center;
    background-repeat: no-repeat;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    pointer-events: all;
    background-color: transparent;
    width: 90px;
    height: 70px;

    border-radius: 0;
    background-image: ${(props) => `url("${props.backgroundImage.src}")`};
    background-position: center;
    background-repeat: no-repeat;

    cursor: pointer;
  }
`
