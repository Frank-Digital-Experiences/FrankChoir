import styled from "@emotion/styled"
import React, { useEffect } from "react"
import { useScrollPosition } from "../../hooks/useScroll"
import stickerSmileyFold from "../../../images/sticker_smiley_fold.svg"
import stickerSmileyHalf from "../../../images/sticker_smiley_03.svg"
import stickerSmileyHearth from "../../../images/stickerSmileyHearth.svg"

type SmileyStickerProps = {
  id: string
  one?: boolean
  positionLeft?: string
  hearth?: boolean
  spin?: boolean
}
const SmileySticker: React.FC<SmileyStickerProps> = ({
  id,
  one,
  positionLeft,
  hearth,
  spin,
}) => {
  const scrollPos = useScrollPosition().y / 2

  useEffect(() => {
    const sticker = document.getElementById(id)
    if (sticker && spin) {
      sticker.style.transform = `rotate(${scrollPos}deg)`
    }
  }, [scrollPos])

  return (
    <Sticker
      id={id}
      positionLeft={positionLeft}
      src={
        one
          ? stickerSmileyFold
          : hearth
          ? stickerSmileyHearth
          : stickerSmileyHalf
      }
      role="presentation"
      aria-hidden="true"
      alt=""
    />
  )
}

const Sticker = styled.img<SmileyStickerProps>`
  width: 75px;
  position: sticky;
  margin: 50px 0;
  left: ${(SmileyStickerProps) =>
    SmileyStickerProps.positionLeft
      ? `${SmileyStickerProps.positionLeft}`
      : "300px"};
`

export default SmileySticker
