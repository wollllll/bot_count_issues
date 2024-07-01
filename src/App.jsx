import './App.css'
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {TabPanel} from "./components/TabPanel.jsx";
import axios from "axios";
import {IssueLogTable} from "./components/IssueLogTable.jsx";
import {LineChart} from "@mui/x-charts";

const getLastMonday = () => {
    const date = new Date()
    const daysToLastMonday = (date.getDay() + 6) % 7
    date.setDate(date.getDate() - daysToLastMonday)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function App() {
    const url = new URL(window.location.href)
    const apiUrl = 'https://script.google.com/macros/s/AKfycbz7KSgknWXupLqaHMmldXtrdegvn5zaWJQoe93o1MdfbE6vhxqBZY33huJzcdcFsmg1/exec'
    const [tab, setTab] = useState(Number(url.searchParams.get('tab')))
    const [type, setType] = useState(null)
    const [issueLogs, setIssueLogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [date, setDate] = useState(getLastMonday())
    const [dateFrom, setDateFrom] = useState(getLastMonday())
    const [dateTo, setDateTo] = useState(getLastMonday())
    const [isInit, setIsInit] = useState(true)

    const [form, setForm] = useState({
        item: 'assign_count',
        user_name: null,
        users: [],
    })

    useEffect(() => {
        (async () => {
            const response = await axios.get(apiUrl, {
                params: {
                    route: 'users'
                }
            })
            const users = response.data.users.map(user => user.name)
            const [userName] = users

            setForm({...form, users, user_name: userName})
            setIsLoading(false)
        })()
    }, [form])

    const changeTab = (value) => {
        setTab(value)
        const url = new URL(window.location.href)
        url.searchParams.set('tab', value)
        window.history.pushState({}, '', url.toString());
    }

    const showResult = async (type) => {
        const params = {
            route: 'issue_logs',
            type
        }

        switch (type) {
            case 1:
                params.date = date
                break
            case 2:
                params.item = form.item
                params.date_from = dateFrom
                params.date_to = dateTo
                break
            case 3:
                params.user_name = form.user_name
                params.date_from = dateFrom
                params.date_to = dateTo
                break
        }

        const response = await axios.get(apiUrl, {params})

        setIssueLogs(response.data.issue_logs)
        setType(params.type)
        setIsInit(false)
    }

    return (
        <>
            {isLoading && (
                <Container maxWidth="lg">
                    loading...
                </Container>
            )}
            {!isLoading && (
                <Container maxWidth="lg">
                    <Tabs value={tab} onChange={(event, value) => changeTab(value)}>
                        <Tab label="日付指定"/>
                        <Tab label="項目フィルタ"/>
                        <Tab label="担当者フィルタ"/>
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date"
                                        label="日付"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="contained" sx={{mt: 2}} onClick={() => showResult(1)}>表示</Button>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="item">項目</InputLabel>
                                    <Select
                                        labelId="item"
                                        label="項目"
                                        value={form.item}
                                        onChange={(e) => setForm({...form, item: e.target.value})}
                                    >
                                        <MenuItem value="assign_count">担当チケット</MenuItem>
                                        <MenuItem value="due_week_count">今週期限</MenuItem>
                                        <MenuItem value="resolve_count">処理済み</MenuItem>
                                        <MenuItem value="expire_count">期限切れ</MenuItem>
                                        <MenuItem value="change_count">期限日変更</MenuItem>
                                        <MenuItem value="add_count">追加</MenuItem>
                                        <MenuItem value="close_count">消化</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date_from"
                                        label="日付"
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date_to"
                                        label="日付"
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="contained" sx={{mt: 2}} onClick={() => showResult(2)}>表示</Button>
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="user_name">担当者</InputLabel>
                                    <Select
                                        labelId="user_name"
                                        label="担当者"
                                        value={form.user_name}
                                        onChange={(e) => setForm({...form, user_name: e.target.value})}
                                    >
                                        {
                                            form.users.map((name, index) => {
                                                return (
                                                    <MenuItem key={index} value={name}>{name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date_from"
                                        label="日付"
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date_to"
                                        label="日付"
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="contained" sx={{mt: 2}} onClick={() => showResult(3)}>表示</Button>
                    </TabPanel>

                    {issueLogs.length > 0 && type === 1 && (
                        <IssueLogTable issueLogs={issueLogs}/>
                    )}

                    {issueLogs.result && type === 2 && (
                        <LineChart
                            sx={{mt: 2}}
                            height={600}
                            series={issueLogs.result}
                            xAxis={[{scaleType: 'point', data: issueLogs.dates}]}
                        />
                    )}

                    {issueLogs.result && type === 3 && (
                        <LineChart
                            sx={{mt: 2}}
                            height={600}
                            series={issueLogs.result}
                            xAxis={[{scaleType: 'point', data: issueLogs.dates}]}
                        />
                    )}

                    {!isInit && issueLogs.length === 0  && (
                        <div>データが見つかりませんでした</div>
                    )}
                </Container>
            )}
        </>
    )
}

export default App
