import styled, { CSSProperties } from "styled-components"
import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import { Track } from "./Track"

type SongProps = {
  tracks: any[]
  title: string
}

export const Song: React.FC<SongProps> = ({ tracks, title }) => {
  const [isPlaying, setIsPlaying] = useState(false)
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
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#9191e5",
        progressColor: "#9191e5",
        height: 150,
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
    <StyledSong>
      <h2>{title}</h2>
      <StyledMixer>
        {tracks.map((track, i) => (
          <Track
            key={i}
            duration={songDuration}
            region={region}
            title={track.fields.title}
            isPlaying={isPlaying}
            track={track.fields.track.fields.file.url}
          />
        ))}
      </StyledMixer>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Play"}
      </button>
      <StyledWaveForm
        regionMarker={regionMarker}
        onMouseDown={handleMouseEvent}
        onMouseUp={handleMouseUp}
        id="waveform"
        ref={waveformRef}
      />
    </StyledSong>
  )
}

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
  background-color: #3c083c;
  padding: 10px 0;
  color: #6e6efd;
  &:after {
    content: "";
    position: absolute;
    background-color: #c1e249;
    top: 0;
    height: 100%;
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

const StyledSong = styled.div`
  margin-top: 50px;
`

const StyledMixer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 150px);
`
