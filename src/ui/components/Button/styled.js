import styled from 'styled-components'
import { control } from 'ui/utils/reset'

const bgColors = {
  primaryBlue: 'darkerBlue',
  primaryTeal: 'darkerTeal',
}

const getHoverBackground = ({ theme, background }) =>
  theme.color[bgColors[background]]

const StyledButton = styled.button`
  ${control};

  height: 40px;
  color: ${({ theme }) => theme.color.textWhite};
  background: ${({ theme, background }) => theme.color[background]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${(props) => getHoverBackground(props)};
  }
`

const TextLayer = styled.div`
  position: absolute;
  background: none;
  z-index: 20;
  transition: all 0.3s;
`

const AnimationLayer = styled.div`
  position: absolute;
  width: 200%;
  height: 0;
  background: ${({ theme }) => theme.color.textWhite};
  opacity: 0;
  z-index: 18;
  transform: rotate(45deg);
  transition: all 0.3s;
`

const AnimatedContainer = styled.button`
  ${control} position: relative;
  overflow: hidden;
  width: 200px;
  height: 40px;
  background: ${({ theme, background }) => theme.color[background]};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  color: ${({ theme }) => theme.color.textWhite};

  &:hover {
    ${AnimationLayer} {
      height: 340%;
      opacity: 1;
    }
    ${TextLayer} {
      color: ${({ theme, background }) => theme.color[background]};
    }
  }
  &:active {
    ${AnimationLayer} {
      height: 380%;
    }
  }
`

export { AnimatedContainer, TextLayer, AnimationLayer }

export default StyledButton
