const tokens =[
    {
        "id": "toncoin",
        "symbol": "ton",
        "name": "Toncoin",
        "image": "assets/icons/ton.svg",
        "contract": "0x582d872a1b094fc48f5de31d3b73f2d9be47def1"
    },
    {
        "id": "ethereum",
        "symbol": "eth",
        "name": "Ethereum",
        "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        "contract": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
    },
    {
        "id": "tether",
        "symbol": "usdt",
        "name": "Tether",
        "image": "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
        "contract": "0xdac17f958d2ee523a2206206994597c13d831ec7"
    },
    {
        "id": "binancecoin",
        "symbol": "bnb",
        "name": "Binance Coin",
        "image": "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
        "contract": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
    },
    {
        "id": "usd-coin",
        "symbol": "usdc",
        "name": "USD Coin",
        "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        "contract": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    },
    {
        "id": "cardano",
        "symbol": "ada",
        "name": "Cardano",
        "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
        "contract": "0xc14777c94229582e5758c5a79b83dde876b9be98"
    },
    {
        "id": "ripple",
        "symbol": "xrp",
        "name": "XRP",
        "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
        "contract": "0xcd63bb3586e871611cc60befcadf8e56bc7aeea3"
    },
    {
        "id": "solana",
        "symbol": "sol",
        "name": "Solana",
        "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
        "contract": "0x22c421ba4717edaf6b6bda424207a7335e8f0e52"
    },
    {
        "id": "terra-luna",
        "symbol": "luna",
        "name": "Terra",
        "image": "https://assets.coingecko.com/coins/images/8284/large/luna1557227471663.png?1567147072",
        "contract": "0xba1e47021877a8dbbad5470d98c570859aa5c8d9"
    },
    {
        "id": "polkadot",
        "symbol": "dot",
        "name": "Polkadot",
        "image": "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644"
    },
    {
        "id": "dogecoin",
        "symbol": "doge",
        "name": "Dogecoin",
        "image": "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256"
    },
    {
        "id": "avalanche-2",
        "symbol": "AVAX",
        "name": "Avalanche",
        "image": "https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png?1604021818"
    },
    {
        "id": "binance-usd",
        "symbol": "busd",
        "name": "Binance USD",
        "image": "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766"
    },
    {
        "id": "terrausd",
        "symbol": "ust",
        "name": "TerraUSD",
        "image": "https://assets.coingecko.com/coins/images/12681/large/UST.png?1601612407"
    },
    {
        "id": "shiba-inu",
        "symbol": "shib",
        "name": "Shiba Inu",
        "image": "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1622619446"
    },
    {
        "id": "cosmos",
        "symbol": "atom",
        "name": "Cosmos",
        "image": "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1555657960"
    },
    {
        "id": "matic-network",
        "symbol": "matic",
        "name": "Polygon",
        "image": "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912"
    },
    {
        "id": "wrapped-bitcoin",
        "symbol": "wbtc",
        "name": "Wrapped Bitcoin",
        "image": "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1548822744"
    },
    {
        "id": "dai",
        "symbol": "dai",
        "name": "Dai",
        "image": "https://assets.coingecko.com/coins/images/9956/large/4943.png?1636636734"
    },
    {
        "id": "crypto-com-chain",
        "symbol": "cro",
        "name": "Crypto.com Coin",
        "image": "https://assets.coingecko.com/coins/images/7310/large/cypto.png?1547043960"
    },
    {
        "id": "litecoin",
        "symbol": "ltc",
        "name": "Litecoin",
        "image": "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580"
    },
    {
        "id": "chainlink",
        "symbol": "link",
        "name": "Chainlink",
        "image": "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700"
    },
    {
        "id": "near",
        "symbol": "near",
        "name": "Near",
        "image": "https://assets.coingecko.com/coins/images/10365/large/near_icon.png?1601359077"
    },
    {
        "id": "algorand",
        "symbol": "algo",
        "name": "Algorand",
        "image": "https://assets.coingecko.com/coins/images/4380/large/download.png?1547039725"
    },
    {
        "id": "tron",
        "symbol": "trx",
        "name": "TRON",
        "image": "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066"
    },
    {
        "id": "okb",
        "symbol": "okb",
        "name": "OKB",
        "image": "https://assets.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png?1642471050"
    },
    {
        "id": "fantom",
        "symbol": "ftm",
        "name": "Fantom",
        "image": "https://assets.coingecko.com/coins/images/4001/large/Fantom.png?1558015016"
    },
    {
        "id": "bitcoin-cash",
        "symbol": "bch",
        "name": "Bitcoin Cash",
        "image": "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1594689492"
    },
    {
        "id": "magic-internet-money",
        "symbol": "mim",
        "name": "Magic Internet Money",
        "image": "https://assets.coingecko.com/coins/images/16786/large/mimlogopng.png?1624979612"
    },
    {
        "id": "uniswap",
        "symbol": "uni",
        "name": "Uniswap",
        "image": "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1600306604"
    },
    {
        "id": "ftx-token",
        "symbol": "ftt",
        "name": "FTX Token",
        "image": "https://assets.coingecko.com/coins/images/9026/large/F.png?1609051564"
    },
    {
        "id": "stellar",
        "symbol": "xlm",
        "name": "Stellar",
        "image": "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157"
    },
    {
        "id": "internet-computer",
        "symbol": "icp",
        "name": "Internet Computer",
        "image": "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1620703073"
    },
    {
        "id": "staked-ether",
        "symbol": "steth",
        "name": "Lido Staked Ether",
        "image": "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546"
    },
    {
        "id": "hedera-hashgraph",
        "symbol": "hbar",
        "name": "Hedera",
        "image": "https://assets.coingecko.com/coins/images/3688/large/hbar.png?1637045634"
    },
    {
        "id": "axie-infinity",
        "symbol": "axs",
        "name": "Axie Infinity",
        "image": "https://assets.coingecko.com/coins/images/13029/large/axie_infinity_logo.png?1604471082"
    },
    {
        "id": "leo-token",
        "symbol": "leo",
        "name": "LEO Token",
        "image": "https://assets.coingecko.com/coins/images/8418/large/leo-token.png?1558326215"
    },
    {
        "id": "vechain",
        "symbol": "vet",
        "name": "VeChain",
        "image": "https://assets.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png?1547035194"
    },
    {
        "id": "ethereum-classic",
        "symbol": "etc",
        "name": "Ethereum Classic",
        "image": "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1547034169"
    },
    {
        "id": "klay-token",
        "symbol": "klay",
        "name": "Klaytn",
        "image": "https://assets.coingecko.com/coins/images/9672/large/klaytn.jpeg?1642775250"
    },
    {
        "id": "compound-ether",
        "symbol": "ceth",
        "name": "cETH",
        "image": "https://assets.coingecko.com/coins/images/10643/large/ceth2.JPG?1581389598"
    },
    {
        "id": "cdai",
        "symbol": "cdai",
        "name": "cDAI",
        "image": "https://assets.coingecko.com/coins/images/9281/large/cDAI.png?1576467585"
    },
    {
        "id": "filecoin",
        "symbol": "fil",
        "name": "Filecoin",
        "image": "https://assets.coingecko.com/coins/images/12817/large/filecoin.png?1602753933"
    },
    {
        "id": "frax",
        "symbol": "frax",
        "name": "Frax",
        "image": "https://assets.coingecko.com/coins/images/13422/large/frax_logo.png?1608476506"
    },
    {
        "id": "the-sandbox",
        "symbol": "sand",
        "name": "The Sandbox",
        "image": "https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg?1597397942"
    },
    {
        "id": "monero",
        "symbol": "xmr",
        "name": "Monero",
        "image": "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1547033729"
    },
    {
        "id": "elrond-erd-2",
        "symbol": "egld",
        "name": "Elrond",
        "image": "https://assets.coingecko.com/coins/images/12335/large/elrond3_360.png?1626341589"
    },
    {
        "id": "decentraland",
        "symbol": "mana",
        "name": "Decentraland",
        "image": "https://assets.coingecko.com/coins/images/878/large/decentraland-mana.png?1550108745"
    },
    {
        "id": "theta-token",
        "symbol": "theta",
        "name": "Theta Network",
        "image": "https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png?1548387191"
    },
    {
        "id": "tezos",
        "symbol": "xtz",
        "name": "Tezos",
        "image": "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862"
    },
    {
        "id": "compound-usd-coin",
        "symbol": "cusdc",
        "name": "cUSDC",
        "image": "https://assets.coingecko.com/coins/images/9442/large/Compound_USDC.png?1567581577"
    },
    {
        "id": "osmosis",
        "symbol": "osmo",
        "name": "Osmosis",
        "image": "https://assets.coingecko.com/coins/images/16724/large/osmo.png?1632763885"
    },
    {
        "id": "helium",
        "symbol": "hnt",
        "name": "Helium",
        "image": "https://assets.coingecko.com/coins/images/4284/large/Helium_HNT.png?1612620071"
    },
    {
        "id": "harmony",
        "symbol": "one",
        "name": "Harmony",
        "image": "https://assets.coingecko.com/coins/images/4344/large/Y88JAze.png?1565065793"
    },
    {
        "id": "eos",
        "symbol": "eos",
        "name": "EOS",
        "image": "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png?1547034481"
    },
    {
        "id": "iota",
        "symbol": "miota",
        "name": "IOTA",
        "image": "https://assets.coingecko.com/coins/images/692/large/IOTA_Swirl.png?1604238557"
    },
    {
        "id": "bittorrent-old",
        "symbol": "bttold",
        "name": "BitTorrent [OLD]",
        "image": "https://assets.coingecko.com/coins/images/7595/large/BTT_Token_Graphic.png?1555066995"
    },
    {
        "id": "the-graph",
        "symbol": "grt",
        "name": "The Graph",
        "image": "https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png?1608145566"
    },
    {
        "id": "aave",
        "symbol": "aave",
        "name": "Aave",
        "image": "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110"
    },
    {
        "id": "theta-fuel",
        "symbol": "tfuel",
        "name": "Theta Fuel",
        "image": "https://assets.coingecko.com/coins/images/8029/large/1_0YusgngOrriVg4ZYx4wOFQ.png?1553483622"
    },
    {
        "id": "pancakeswap-token",
        "symbol": "cake",
        "name": "PancakeSwap",
        "image": "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1629359065"
    },
    {
        "id": "bitcoin-cash-sv",
        "symbol": "bsv",
        "name": "Bitcoin SV",
        "image": "https://assets.coingecko.com/coins/images/6799/large/BSV.png?1558947902"
    },
    {
        "id": "maker",
        "symbol": "mkr",
        "name": "Maker",
        "image": "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png?1585191826"
    },
    {
        "id": "radix",
        "symbol": "xrd",
        "name": "Radix",
        "image": "https://assets.coingecko.com/coins/images/4374/large/Radix.png?1629701658"
    },
    {
        "id": "kusama",
        "symbol": "ksm",
        "name": "Kusama",
        "image": "https://assets.coingecko.com/coins/images/9568/large/m4zRhP5e_400x400.jpg?1576190080"
    },
    {
        "id": "ecomi",
        "symbol": "omi",
        "name": "ECOMI",
        "image": "https://assets.coingecko.com/coins/images/4428/large/ECOMI.png?1557928886"
    },
    {
        "id": "arweave",
        "symbol": "ar",
        "name": "Arweave",
        "image": "https://assets.coingecko.com/coins/images/4343/large/oRt6SiEN_400x400.jpg?1591059616"
    },
    {
        "id": "flow",
        "symbol": "flow",
        "name": "Flow",
        "image": "https://assets.coingecko.com/coins/images/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png?1631696776"
    },
    {
        "id": "true-usd",
        "symbol": "tusd",
        "name": "TrueUSD",
        "image": "https://assets.coingecko.com/coins/images/3449/large/tusd.png?1618395665"
    },
    {
        "id": "huobi-token",
        "symbol": "ht",
        "name": "Huobi Token",
        "image": "https://assets.coingecko.com/coins/images/2822/large/huobi-token-logo.png?1547036992"
    },
    {
        "id": "huobi-btc",
        "symbol": "hbtc",
        "name": "Huobi BTC",
        "image": "https://assets.coingecko.com/coins/images/12407/large/Unknown-5.png?1599624896"
    },
    {
        "id": "blockstack",
        "symbol": "stx",
        "name": "Stacks",
        "image": "https://assets.coingecko.com/coins/images/2069/large/Stacks_logo_full.png?1604112510"
    },
    {
        "id": "gala",
        "symbol": "gala",
        "name": "Gala",
        "image": "https://assets.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png?1600233435"
    },
    {
        "id": "enjincoin",
        "symbol": "enj",
        "name": "Enjin Coin",
        "image": "https://assets.coingecko.com/coins/images/1102/large/enjin-coin-logo.png?1547035078"
    },
    {
        "id": "ecash",
        "symbol": "xec",
        "name": "eCash",
        "image": "https://assets.coingecko.com/coins/images/16646/large/Logo_final-22.png?1628239446"
    },
    {
        "id": "amp-token",
        "symbol": "amp",
        "name": "Amp",
        "image": "https://assets.coingecko.com/coins/images/12409/large/amp-200x200.png?1599625397"
    },
    {
        "id": "quant-network",
        "symbol": "qnt",
        "name": "Quant",
        "image": "https://assets.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg?1612437252"
    },
    {
        "id": "neo",
        "symbol": "neo",
        "name": "NEO",
        "image": "https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png?1594357361"
    },
    {
        "id": "celo",
        "symbol": "celo",
        "name": "Celo",
        "image": "https://assets.coingecko.com/coins/images/11090/large/icon-celo-CELO-color-500.png?1592293590"
    },
    {
        "id": "convex-finance",
        "symbol": "cvx",
        "name": "Convex Finance",
        "image": "https://assets.coingecko.com/coins/images/15585/large/convex.png?1621256328"
    },
    {
        "id": "kucoin-shares",
        "symbol": "kcs",
        "name": "KuCoin Token",
        "image": "https://assets.coingecko.com/coins/images/1047/large/sa9z79.png?1610678720"
    },
    {
        "id": "oasis-network",
        "symbol": "rose",
        "name": "Oasis Network",
        "image": "https://assets.coingecko.com/coins/images/13162/large/rose.png?1605772906"
    },
    {
        "id": "zcash",
        "symbol": "zec",
        "name": "Zcash",
        "image": "https://assets.coingecko.com/coins/images/486/large/circle-zcash-color.png?1547034197"
    },
    {
        "id": "thorchain",
        "symbol": "rune",
        "name": "THORChain",
        "image": "https://assets.coingecko.com/coins/images/6595/large/RUNE.png?1614160507"
    },
    {
        "id": "paxos-standard",
        "symbol": "usdp",
        "name": "Pax Dollar",
        "image": "https://assets.coingecko.com/coins/images/6013/large/Pax_Dollar.png?1629877204"
    },
    {
        "id": "basic-attention-token",
        "symbol": "bat",
        "name": "Basic Attention Token",
        "image": "https://assets.coingecko.com/coins/images/677/large/basic-attention-token.png?1547034427"
    },
    {
        "id": "curve-dao-token",
        "symbol": "crv",
        "name": "Curve DAO Token",
        "image": "https://assets.coingecko.com/coins/images/12124/large/Curve.png?1597369484"
    },
    {
        "id": "loopring",
        "symbol": "lrc",
        "name": "Loopring",
        "image": "https://assets.coingecko.com/coins/images/913/large/LRC.png?1572852344"
    },
    {
        "id": "gatechain-token",
        "symbol": "gt",
        "name": "GateToken",
        "image": "https://assets.coingecko.com/coins/images/8183/large/gt.png?1556085624"
    },
    {
        "id": "nexo",
        "symbol": "nexo",
        "name": "NEXO",
        "image": "https://assets.coingecko.com/coins/images/3695/large/nexo.png?1548086057"
    },
    {
        "id": "dash",
        "symbol": "dash",
        "name": "Dash",
        "image": "https://assets.coingecko.com/coins/images/19/large/dash-logo.png?1548385930"
    },
    {
        "id": "bitkub-coin",
        "symbol": "kub",
        "name": "Bitkub Coin",
        "image": "https://assets.coingecko.com/coins/images/15760/large/KUB.png?1621825161"
    },
    {
        "id": "chiliz",
        "symbol": "chz",
        "name": "Chiliz",
        "image": "https://assets.coingecko.com/coins/images/8834/large/Chiliz.png?1561970540"
    },
    {
        "id": "celsius-degree-token",
        "symbol": "cel",
        "name": "Celsius Network",
        "image": "https://assets.coingecko.com/coins/images/3263/large/CEL_logo.png?1609598753"
    },
    {
        "id": "nem",
        "symbol": "xem",
        "name": "NEM",
        "image": "https://assets.coingecko.com/coins/images/242/large/NEM_WC_Logo_200px.png?1642668663"
    },
    {
        "id": "kadena",
        "symbol": "kda",
        "name": "Kadena",
        "image": "https://assets.coingecko.com/coins/images/3693/large/djLWD6mR_400x400.jpg?1591080616"
    },
    {
        "id": "safemoon",
        "symbol": "safemoon",
        "name": "SafeMoon [OLD]",
        "image": "https://assets.coingecko.com/coins/images/14362/large/174x174-white.png?1617174846"
    },
    {
        "id": "waves",
        "symbol": "waves",
        "name": "Waves",
        "image": "https://assets.coingecko.com/coins/images/425/large/waves.png?1548386117"
    },
    {
        "id": "yearn-finance",
        "symbol": "yfi",
        "name": "yearn.finance",
        "image": "https://assets.coingecko.com/coins/images/11849/large/yfi-192x192.png?1598325330"
    },
    {
        "id": "sushi",
        "symbol": "sushi",
        "name": "Sushi",
        "image": "https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1606986688"
    }
]


export default tokens;