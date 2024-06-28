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
import {useState} from "react";
import {TabPanel} from "./components/TabPanel.jsx";
import axios from "axios";
import {IssueLogTable} from "./components/IssueLogTable.jsx";
import {LineChart} from "@mui/x-charts";

function App() {
    const url = new URL(window.location.href)
    const apiUrl = 'https://script.google.com/macros/s/AKfycbz7KSgknWXupLqaHMmldXtrdegvn5zaWJQoe93o1MdfbE6vhxqBZY33huJzcdcFsmg1/exec'

    const [tab, setTab] = useState(Number(url.searchParams.get('tab')))
    const [type, setType] = useState(null)
    const [mondayDate, setMondayDate] = useState('2024-06-17')
    const [mondayDateFrom, setMondayDateFrom] = useState('2024-06-17')
    const [mondayDateTo, setMondayDateTo] = useState('2024-06-17')
    const [item, setItem] = useState('assign_count')
    const [userName, setUserName] = useState('藤井 勝史')
    const [issueLogs, setIssueLogs] = useState([])

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
                params.date = mondayDate
                break
            case 2:
                params.item = item
                params.date_from = mondayDateFrom
                params.date_to = mondayDateTo
                break
            case 3:
                params.user_name = userName
                params.date_from = mondayDateFrom
                params.date_to = mondayDateTo
                break
        }

        const response = await axios.get(apiUrl, {params})

        setIssueLogs(response.data.issue_logs)
        setType(params.type)
    }

    return (
        <>
            <Container maxWidth="lg">
                <Tabs value={tab} onChange={(event, value) => changeTab(value)}>
                    <Tab label="日付指定" />
                    <Tab label="項目フィルタ" />
                    <Tab label="担当者フィルタ" />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    id="date"
                                    label="日付"
                                    type="date"
                                    value={mondayDate}
                                    onChange={(e) => setMondayDate(e.target.value)}
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
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
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
                                    value={mondayDateFrom}
                                    onChange={(e) => setMondayDateFrom(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    id="date_to"
                                    label="日付"
                                    type="date"
                                    value={mondayDateTo}
                                    onChange={(e) => setMondayDateTo(e.target.value)}
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
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                >
                                    <MenuItem value="藤井 勝史">藤井 勝史</MenuItem>
                                    <MenuItem value="小平 晋悟">小平 晋悟</MenuItem>
                                    <MenuItem value="荒井 哲也">荒井 哲也</MenuItem>
                                    <MenuItem value="工藤 匠悟">工藤 匠悟</MenuItem>
                                    <MenuItem value="宮前 慶一郎">宮前 慶一郎</MenuItem>
                                    <MenuItem value="加藤 誉大">加藤 誉大</MenuItem>
                                    <MenuItem value="津谷 宙隼">津谷 宙隼</MenuItem>
                                    <MenuItem value="木村 流輝">木村 流輝</MenuItem>
                                    <MenuItem value="杉山 虎太朗">杉山 虎太朗</MenuItem>
                                    <MenuItem value="牟田園 明">牟田園 明</MenuItem>
                                    <MenuItem value="イン・ヲンジエ">イン・ヲンジエ</MenuItem>
                                    <MenuItem value="川上 駿季">川上 駿季</MenuItem>
                                    <MenuItem value="赤松 晏奈">赤松 晏奈</MenuItem>
                                    <MenuItem value="園田 大地">園田 大地</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    id="date_from"
                                    label="日付"
                                    type="date"
                                    value={mondayDateFrom}
                                    onChange={(e) => setMondayDateFrom(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    id="date_to"
                                    label="日付"
                                    type="date"
                                    value={mondayDateTo}
                                    onChange={(e) => setMondayDateTo(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{mt: 2}} onClick={() => showResult(3)}>表示</Button>
                </TabPanel>

                {type === 1 && (
                    <IssueLogTable issueLogs={issueLogs} />
                )}

                {type === 2 && (
                    <LineChart
                        sx={{mt: 2}}
                        height={600}
                        series={issueLogs.result}
                        xAxis={[{ scaleType: 'point', data: issueLogs.dates}]}
                    />
                )}

                {type === 3 && (
                    <LineChart
                        sx={{mt: 2}}
                        height={600}
                        series={issueLogs.result}
                        xAxis={[{ scaleType: 'point', data: issueLogs.dates}]}
                    />
                )}
            </Container>
    </>
    )
}

export default App
