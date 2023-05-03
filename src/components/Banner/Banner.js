import { Container, Typography } from '@material-ui/core'
import React from 'react'
import Carausel from './Carausel'

function Banner() {
  return (
    <div className='banner'>
        <Container className='banner__content'>
            <div className='banner__tagline'>
                <Typography variant='h2' style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:"Montserrat"
                }}>
                    Crypto Track
                </Typography>
                <Typography variant='subtitle2' style={{
                    color:"darkgrey",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat"
                }}>
                    Crypto Track
                </Typography>

            </div>
            <Carausel/>
        </Container>
    </div>
  )
}

export default Banner