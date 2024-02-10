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
type RegionMarker = {
  stop: number
  start: number
  markerStart: number
  markerStop: number
}

type Region = {
  start: number
  stop: number
  markerStart: number | null
  markerStop: number | null
}

export const Song: React.FC<SongProps> = ({ tracks, title }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [extraTracks, setExtraTracks] = useState(0)
  const [songDuration, setSongDuration] = useState(0)

  const [mouseIsDown, setMouseIsDown] = useState(false)
  const [dragAnchor, setDragAnchor] = useState("stop")

  const [region, setRegion] = useState<Region>({
    start: 0,
    stop: 0,
    markerStart: null,
    markerStop: null,
  })

  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  const resetRegion = (duration: number) => {
    setRegion({
      start: 0,
      stop: duration * 1000,
      markerStart: null,
      markerStop: null,
    })
  }

  // adds extra empty tracks so total tracks are 6
  useEffect(() => {
    if (tracks && tracks.length < 6) {
      setExtraTracks(6 - tracks.length)
    }
  }, [tracks])

  // initiate waveform
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#01A301",
        progressColor: "#01A301",
        height: 90,
        barWidth: 1.8,
        barGap: 1.5,
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
  const wavesurfer = wavesurferRef?.current

  const changeRegionValues = (offsetX: any, regionKey: any) => {
    setRegion((prevState) => {
      return {
        ...prevState,
        ["marker" + regionKey[0].toUpperCase() + regionKey.substring(1)]:
          offsetX,
      }
    })
  }
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setMouseIsDown(true)
    setIsPlaying(false)
    setRegion((prevState) => {
      return {
        ...prevState,
        markerStart: event.nativeEvent.offsetX,
        markerStop: event.nativeEvent.offsetX,
      }
    })
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setMouseIsDown(false)
    if (wavesurfer && region.markerStart && region.markerStop) {
      const duration = wavesurfer.getDuration()
      const start =
        (region.markerStart / waveformRef.current!.offsetWidth) *
        duration *
        1000
      const stop =
        (region.markerStop / waveformRef.current!.offsetWidth) * duration * 1000
      setRegion((prevState) => {
        return {
          ...prevState,
          start: start < stop ? start : stop,
          stop: stop > start ? stop : start,
        }
      })
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseIsDown) {
      return
    } else {
      if (dragAnchor === "start" && region.markerStop) {
        if (event.nativeEvent.offsetX > region.markerStop) {
          setDragAnchor("stop")
        }
      }
      if (dragAnchor === "stop" && region.markerStart) {
        if (event.nativeEvent.offsetX < region.markerStart) {
          setDragAnchor("start")
        }
      }

      changeRegionValues(event.nativeEvent.offsetX, dragAnchor)
    }
  }

  const handleRegionDrag = (
    event: React.MouseEvent<HTMLDivElement>,
    anchor: string
  ) => {
    setDragAnchor(anchor)
    event.stopPropagation()
    setMouseIsDown(true)
    setIsPlaying(false)
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
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            id="waveform"
            ref={waveformRef}
          >
            <StyledRegionMarker mouseIsDown={mouseIsDown} regionMarker={region}>
              <DragWrapper
                onMouseDown={(e) => handleRegionDrag(e, "start")}
                position="start"
              ></DragWrapper>

              <DragWrapper
                onMouseDown={(e) => handleRegionDrag(e, "stop")}
                position="end"
              ></DragWrapper>
            </StyledRegionMarker>
          </StyledWaveForm>
        </WaveformWrapper>
      </StyledPanel>
    </StyledMixer>
  )
}
type BackgroundProps = {
  backgroundImage: any
}

type dragwrapperprops = {
  position: string
}
const DragWrapper = styled.div<dragwrapperprops>`
  height: 100%;
  width: 28px;
  z-index: 10;
  ${(props) => {
    return props.position === "start"
      ? "margin-left: -14px"
      : "margin-right: -14px"
  }};

  position: relative;

  cursor: pointer;
`
type RegionMarkerProps = {
  regionMarker: any
  mouseIsDown: boolean
}
const StyledRegionMarker = styled.div<RegionMarkerProps>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  pointer-events: ${(props) => (props.mouseIsDown ? "none" : "")};
  background: linear-gradient(
    to top,
    #00000000 25%,
    #57ff2880 40%,
    #1aff009a 60%,
    #00000000 75%
  );
  z-index: 500;
  top: 0;
  height: 100%;
  box-shadow: -1px 0px 0px 0px white, 1px 0px 0px 0px white;
  resize: both;
  ${(props) => {
    const stop =
      props.regionMarker.markerStart > props.regionMarker.markerStop
        ? props.regionMarker.markerStart
        : props.regionMarker.markerStop
    const start =
      props.regionMarker.markerStart < props.regionMarker.markerStop
        ? props.regionMarker.markerStart
        : props.regionMarker.markerStop

    const width = stop - start

    return `
      left: ${start}px;
      width: ${width}px;
      `
  }};
`
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
  background-size: 100% 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const StyledLogo = styled.div`
  aspect-ratio: 1/1;
`
const StyledSpeaker = styled.div`
  aspect-ratio: 146/190;
  width: 70%;
`
type ButtonProps = {
  isPlaying: boolean
}
const StyledButton = styled.div<ButtonProps>`
  position: relative;
  aspect-ratio: 100/160;
  height: 20%;
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
  position: relative;
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

const StyledWaveForm = styled.div`
  position: relative;
  background-color: #1e1e1e;

  padding: 10px 0;

  height: 90px;
  border-radius: 10px;
`
