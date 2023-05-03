import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import axios from 'axios'
import { CryptoState } from '../cryptoContext'
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Banner/Carausel'
import { Pagination } from '@material-ui/lab'


function CoinsTable() {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState('')
    const [page,setPage] = useState(1)

    const {currency,symbol} = CryptoState();
    const navigate = useNavigate();

    const fetchCoins = async() =>{
        setLoading(true)
        const {data} = await  axios.get(CoinList(currency))
        if(data){
            setCoins(data)
            setLoading(false)
        }
    }

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

    useEffect(() => {
        fetchCoins()
    },[currency])

    const handleSearch = () =>{
        return coins.filter((coin) => 
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)  )
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography variant='h4' style={{margin:18, fontFamily:"Montserrat"}}>
                Cryptocurrency Prices by Marcet Cap
            </Typography>

            <TextField label="Search For A Crypto Currency"  variant='outlined' style={{
                marginBottom:20, width:"100%"
            }} onChange={(e) => setSearch(e.target.value.toLowerCase())}/>

            <TableContainer>
                {
                    loading 
                    ? (<LinearProgress style={{backgroundColor:"gold"}}/> )
                    : (
                        <Table>
                            <TableHead style={{backgroundColor:"#EEBC1D"}}>
                                <TableRow>
                                    {["Coin","Price","24h change", "Market Cap"].map((head) => (
                                        <TableCell style={{
                                            color:"black",
                                            fontWeight:"700",
                                            fontFamily:"Montserrat"
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>   
                            </TableHead>

                            <TableBody>
                                {handleSearch().slice((page -1)*10,(page -1)*10 +10).map((row) => {
                                const profit = row.price_change_percentage_24h > 0;

                                return(
                                    <TableRow onCLick={() => navigate(`/coins/${row.id}`)}
                                    className='table__row' key={row.name}>
                                        <TableCell component='th' scope='row' style={{display:"flex",gap:15,}}>
                                            <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}}/>
                                            <div style={{display:"flex", flexDirection:"column"}}>
                                                <span style={{textTransform:"uppercase",fontSize:22}} >
                                                    {row.symbol}
                                                </span>
                                                <span style={{color:"darkgrey"}}>
                                                    {row.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell align='right'>
                                            {symbol}{''}{numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>

                                        <TableCell align='right' style={{color:profit > 0 ? 'rgb(14,203,129)' : "red", fontWeight:500}}>
                                        {profit && "+"}{row.price_change_percentage_24h?.toFixed(2)}%
                                        </TableCell>

                                        <TableCell align='right'>
                                            {symbol}{''}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                        </TableCell>
                                    </TableRow>
                                )
                                }) }
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>

            <Pagination
            style={{padding:20, width:"100%", display:"flex", justifyContent:"center"}}
            className='pagination__item'    
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_,value) => {
                setPage(value);
                window.scroll(0,450)
            }}
            />
            
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable