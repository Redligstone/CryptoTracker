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
                    Crypto Tracker
                </Typography>
                <Typography variant='subtitle2' style={{
                    color:"darkgrey",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat"
                }}>
                    Get All The Info Regarding Your Favourite Crypto Currency
                </Typography>

            </div>
            <Carausel/>
        </Container>
    </div>
  )
}

export default Banner