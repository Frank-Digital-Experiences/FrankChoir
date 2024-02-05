"use client"
import styled, { CSSProperties } from "styled-components"
import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import { Track } from "./Track"
import TrackBG from "../../public/images/track.png"
import Wood from "../../public/images/wood.png"
import Speaker from "../../public/images/speaker.png"
import Logo from "../../public/images/logo.png"
import StartButton from "../../public/images/button.png"
import StopButton from "../../public/images/StopButton.png"

type SongProps = {
  tracks: any[]
  title: string
}

export const Song: React.FC<SongProps> = ({ tracks, title }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [extraTracks, setExtraTracks] = useState(0)
  const [songDuration, setSongDuration] = useState(0)
  const [region, setRegion] = useState<Region>({ start: 0, end: 0 })
  const [regionMarker, setRegionMarker] = useState<RegionMarker>({
    left: 0,
    right: 0,
  })
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  const resetRegion = (duration: number) => {
    setRegion({ start: 0, end: duration * 1000 })
  }

  useEffect(() => {
    if (tracks && tracks.length < 6) {
      console.log(tracks)

      setExtraTracks(6 - tracks.length)
    }
  }, [tracks])

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#01A301",
        progressColor: "#01A301",
        height: 90,
        barWidth: 5,
        barGap: 1,
        barRadius: 10,
        normalize: true,
      })

      wavesurferRef.current.load(tracks[0].fields.track.fields.file.url)
      wavesurferRef.current.on("ready", () => {
        const duration = wavesurferRef.current!.getDuration()
        setSongDuration(duration)
        resetRegion(duration)
      })

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy()
          wavesurferRef.current = null
        }
      }
    }
  }, [tracks])

  const handleMouseEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsPlaying(false)
    const wavesurfer = wavesurferRef.current
    if (wavesurfer) {
      const { offsetX } = event.nativeEvent

      const duration = wavesurfer.getDuration()
      const currentPosition =
        (offsetX / waveformRef.current!.offsetWidth) * duration
      wavesurfer.seekTo(currentPosition)

      setRegionMarker((prevState) => ({
        ...prevState,
        left: offsetX,
      }))
      currentPosition &&
        setRegion((prevState) => ({
          ...prevState,
          start: currentPosition * 1000,
        }))
    }
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const wavesurfer = wavesurferRef.current
    if (wavesurfer) {
      const { offsetX } = event.nativeEvent
      setRegionMarker((prevState) => ({
        ...prevState,
        right: offsetX,
      }))
      const duration = wavesurfer.getDuration()
      const currentPosition =
        (offsetX / waveformRef.current!.offsetWidth) * duration
      wavesurfer.seekTo(currentPosition)
      currentPosition &&
        setRegion((prevState) => ({
          ...prevState,
          end: currentPosition * 1000,
        }))
    }
  }

  return (
    <StyledMixer>
      <StyledWood backgroundImage={Wood}>
        <StyledLogo>
          <img src={Logo.src} />
        </StyledLogo>
        <StyledSpeaker>
          <img src={Speaker.src} />
        </StyledSpeaker>
        <StyledButton isPlaying={isPlaying}>
          <img src={isPlaying ? StopButton.src : StartButton.src} />
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "Stop" : "Play"}
          </button>
        </StyledButton>
      </StyledWood>
      <StyledPanel>
        <Heading>
          <h2>{title}</h2>
        </Heading>
        <StyledTracks>
          {tracks.map((track, i) => {
            return (
              <Track
                key={i}
                duration={songDuration}
                region={region}
                title={track.fields.title}
                isPlaying={isPlaying}
                track={track.fields.track.fields.file.url}
              />
            )
          })}
          {Array.from(Array(extraTracks), (e, i) => {
            return <ExtraTrack backgroundImage={TrackBG} key={i}></ExtraTrack>
          })}
        </StyledTracks>
        <WaveformWrapper>
          <StyledWaveForm
            regionMarker={regionMarker}
            onMouseDown={handleMouseEvent}
            onMouseUp={handleMouseUp}
            id="waveform"
            ref={waveformRef}
          />
        </WaveformWrapper>
      </StyledPanel>
    </StyledMixer>
  )
}
type BackgroundProps = {
  backgroundImage: any
}

const StyledMixer = styled.div`
  display: flex;
`

const StyledWood = styled.div<BackgroundProps>`
  aspect-ratio: 200 / 750;
  position: relative;
  max-height: 750px;
  min-width: 120px;

  background-image: ${(props) => `url("${props.backgroundImage.src}")`};
  background-repeat: no-repeat;
  background-size: contain;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const StyledLogo = styled.div`
  margin-top: 30%;

  width: 100%;
  aspect-ratio: 1/1;
`
const StyledSpeaker = styled.div`
  margin-top: 30%;
  aspect-ratio: 146/190;
  width: 70%;
  margin-left: 50%;
  transform: translateX(-50%);
`
type ButtonProps = {
  isPlaying: boolean
}
const StyledButton = styled.div<ButtonProps>`
  margin-top: 30%;
  position: relative;
  aspect-ratio: 100/160;
  height: 20%;
  margin-left: 50%;
  transform: translateX(-50%);
  ${(props) => {
    if (props.isPlaying) {
      return `
        &:after {

    content: "";
    position: absolute;
    width: 20px;
    height: 20px;

    left: 50%;
    transform: translateX(-50%);
    top: 8%;
    background-color: #37ff00a4;
    border-radius: 50%;
    box-shadow: 0px 0px 54px 10px rgba(54, 217, 28, 1);
    -webkit-box-shadow: 0px 0px 54px 10px rgba(54, 217, 28, 1);
    -moz-box-shadow: 0px 0px 54px 10px rgba(54, 217, 28, 1);
  }
      `
    }
  }}

  button {
    position: absolute;
    bottom: 30%;
    border: none;
    background-color: transparent;
    text-transform: uppercase;
    font-family: "Roboto Mono";
    text-shadow: 2px 2px 2px white;
    left: 50%;
    transform: translateX(-50%);
  }
`
const StyledPanel = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;

  max-width: 1200px;
`

const StyledTracks = styled.div`
  outline: solid grey;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(120px, 200px);
`
const WaveformWrapper = styled.div`
  padding: 1rem;
  background: linear-gradient(180deg, #aeab98 0%, #b7b3a6 100%);
  height: 105px;
  min-width: 500px;
`

const Heading = styled.div`
  border: 2px solid black;
  text-align: center;
  background: rgb(244, 243, 236);

  background: linear-gradient(
    180deg,
    rgba(244, 243, 236, 1) 0%,
    rgba(232, 228, 214, 1) 100%
  );
  h2 {
    font-family: "Roboto Mono";
    font-size: 18px;
    text-shadow: 2px 2px 2px white;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 3px;
    padding: 15px 0;
  }
`
const ExtraTrack = styled.div<BackgroundProps>`
  background-image: ${(props) => `url("${props.backgroundImage.src}")`};
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  aspect-ratio: 200 / 530;

  margin: 0;
  padding: 0;
`
type RegionMarker = {
  right: number
  left: number
}

type Region = {
  start: number
  end: number
}

type StyledWaveFormProps = {
  regionMarker: RegionMarker // Define the type of regionMarker prop
}

const StyledWaveForm = styled.div<StyledWaveFormProps>`
  position: relative;
  background-color: #1e1e1e;

  padding: 10px 0;

  height: 90px;
  border-radius: 10px;
  &:after {
    content: "";
    position: absolute;
    background: linear-gradient(
      to top,
      #00000000 10%,
      #ffffff80 30%,
      #ffffff80 70%,
      #00000000 90%
    );
    z-index: 500;
    top: 0;
    height: 100%;
    box-shadow: -1px 0px 0px 0px white, 1px 0px 0px 0px white;
    ${(props) => {
      const width = props.regionMarker.right - props.regionMarker.left
      const start = props.regionMarker.left

      return `
      left: ${start}px;
      width: ${width}px;
      `
    }};
  }
`
