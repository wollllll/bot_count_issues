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

function App() {
    const url = new URL(window.location.href)
    const apiUrl = 'https://script.google.com/macros/s/AKfycbz7KSgknWXupLqaHMmldXtrdegvn5zaWJQoe93o1MdfbE6vhxqBZY33huJzcdcFsmg1/exec'

    const [tab, setTab] = useState(Number(url.searchParams.get('tab')))
    const [type, setType] = useState(null)
    const [issueLogs, setIssueLogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [form, setForm] = useState({
        date: '2024-06-17',
        date_from: '2024-06-17',
        date_to: '2024-06-17',
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
                params.date = form.date
                break
            case 2:
                params.item = form.item
                params.date_from = form.date_from
                params.date_to = form.date_to
                break
            case 3:
                params.user_name = form.user_name
                params.date_from = form.date_from
                params.date_to = form.date_to
                break
        }

        const response = await axios.get(apiUrl, {params})

        setIssueLogs(response.data.issue_logs)
        setType(params.type)
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
                                        value={form.date}
                                        onChange={(e) => setForm({...form, date: e.target.value})}
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
                                        value={form.date_from}
                                        onChange={(e) => setForm({...form, date_from: e.target.value})}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date_to"
                                        label="日付"
                                        type="date"
                                        value={form.date_to}
                                        onChange={(e) => setForm({...form, date_to: e.target.value})}
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
                                        value={form.date_from}
                                        onChange={(e) => setForm({...form, date_from: e.target.value})}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date_to"
                                        label="日付"
                                        type="date"
                                        value={form.date_to}
                                        onChange={(e) => setForm({...form, date_to: e.target.value})}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="contained" sx={{mt: 2}} onClick={() => showResult(3)}>表示</Button>
                    </TabPanel>

                    {type === 1 && (
                        <IssueLogTable issueLogs={issueLogs}/>
                    )}

                    {type === 2 && (
                        <LineChart
                            sx={{mt: 2}}
                            height={600}
                            series={issueLogs.result}
                            xAxis={[{scaleType: 'point', data: issueLogs.dates}]}
                        />
                    )}

                    {type === 3 && (
                        <LineChart
                            sx={{mt: 2}}
                            height={600}
                            series={issueLogs.result}
                            xAxis={[{scaleType: 'point', data: issueLogs.dates}]}
                        />
                    )}
                </Container>
            )}
        </>
    )
}

export default App
