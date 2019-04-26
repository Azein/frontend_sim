import styled from '@/styled-components'
import { Layout } from '@/ui/components/Layout'

export const Screen = styled(Layout)``

export const HUDArea = styled(Layout)`
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  height: 200px;
  padding-top: 10px;
  padding-bottom: 10px;
`

export const SceneLayout = styled(Layout)`
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
