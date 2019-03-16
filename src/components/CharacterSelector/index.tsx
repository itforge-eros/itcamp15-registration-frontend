import React, {useEffect} from 'react'
import {useState} from 'react'
import styled from '@emotion/styled'
import Button from '../Button'
import CharacterCard from './CharacterCard'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../../components/Modal'
import {navigate} from '@reach/router'
import {useSwipeable} from 'react-swipeable'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 3em;
`

const Card = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  justify-content: center;
`

const Description = styled.label`
  color: white;
  font-size: 1.9em;
  align-self: center;
  margin-top: 2em;
`

enum Character {
  app = 'Appermort',
  game = 'GrindelGame',
  data = 'Dragota',
  iot = 'Dobby of Things',
  network = 'Netherine'
}

const majors = ['app', 'network', 'data', 'game', 'iot']

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 780 : false
  )
  useEffect(() => {
    const resizeHandler = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 780)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeHandler)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeHandler)
      }
    }
  }, [])
  return isMobile
}
export default props => {
  if (typeof window !== 'undefined') {
    const [selector, setSelector] = useState<string>('app')
    const [toggle, setIsToggle] = useState<boolean>(false)
    const [field, setField] = useState<string>('app')
    const [modalText, setModalText] = useState<any>(<div />)
    const isMobile = useIsMobile()

    const selectHandler = () => {
      // if (selector) {
      //   navigate(`/${selector}`);
      // }
    }
    const confirm = () => {
      const tempModalText = (
        <div>
          แน่ใจแล้วหรอว่าจะสมัครค่าย
          <br />
          {`"${Character[selector]}"`}
          <br />
        </div>
      )
      setModalText(tempModalText)
      setIsToggle(!toggle)
      setField(selector)
    }

    const DesktopContent = (
      <Row>
        <Card>
          <CharacterCard
            active={selector === 'app'}
            onClick={() => setSelector('app')}
            src="/images/app.png"
          />
          <Description>{Character.app}</Description>
        </Card>
        <Card>
          <CharacterCard
            active={selector === 'network'}
            onClick={() => setSelector('network')}
            src="/images/network.png"
          />
          <Description>{Character.network}</Description>
        </Card>
        <Card>
          <CharacterCard
            active={selector === 'data'}
            onClick={() => setSelector('data')}
            src="/images/data.png"
          />
          <Description>{Character.data}</Description>
        </Card>
        <Card>
          <CharacterCard
            active={selector === 'game'}
            onClick={() => setSelector('game')}
            src="/images/game.png"
          />
          <Description>{Character.game}</Description>
        </Card>
        <Card>
          <CharacterCard
            active={selector === 'iot'}
            onClick={() => setSelector('iot')}
            src="/images/iot.png"
          />
          <Description>{Character.iot}</Description>
        </Card>
      </Row>
    )
    const move = (direction: 'left' | 'right') => {
      if (direction === 'left') {
        setSelector(
          majors[
            (majors.findIndex(major => major === selector) + 1) % majors.length
          ]
        )
      } else {
        setSelector(
          majors[
            majors.findIndex(major => major === selector) - 1 < 0
              ? majors.length - 1
              : majors.findIndex(major => major === selector) - 1
          ]
        )
      }
    }
    const swipeHandler = useSwipeable({
      onSwipedLeft: e => {
        move('left')
      },
      onSwipedRight: e => {
        move('right')
      },
      delta: 10, // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false, // preventDefault on touchmove, *See Details*
      trackTouch: true, // track touch input
      trackMouse: false, // track mouse input
      rotationAngle: 0
    })
    const MobileContent = (
      <Row>
        <div
          onClick={() => move('left')}
          style={{position: 'absolute', top: '50%', left: '0'}}
        >
          <FontAwesomeIcon
            icon="angle-left"
            style={{color: '#ffbc5f', fontSize: '3em', cursor: 'pointer'}}
          />
        </div>
        <Card>
          <CharacterCard
            active={true}
            src={`/images/${selector}.png`}
            {...swipeHandler}
          />
          <Description>{Character[selector]}</Description>

          {/* GET image into memory to make smooth image transition */}
          {majors.map((major, i) => (
            <img
              key={i}
              src={`/images/${major}.png`}
              style={{display: 'none'}}
            />
          ))}
        </Card>
        <div
          onClick={() => move('right')}
          style={{position: 'absolute', top: '50%', right: '0'}}
        >
          <FontAwesomeIcon
            icon="angle-right"
            style={{color: '#ffbc5f', fontSize: '3em', cursor: 'pointer'}}
          />
        </div>
      </Row>
    )

    return (
      <Container>
        {isMobile ? MobileContent : DesktopContent}
        <Button onClick={() => confirm()}>ยืนยันค่าย</Button>
        <Modal
          field={field}
          toggle={toggle}
          text={modalText}
          setToggle={setIsToggle}
          confirm={selectHandler}
          confirmHref={`/${selector}`}
        />
      </Container>
    )
  } else {
    return null
  }
}
