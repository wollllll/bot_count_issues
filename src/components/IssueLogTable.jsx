import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import PropTypes from "prop-types";

export const IssueLogTable = (props) => {
    IssueLogTable.propTypes = {
        children: PropTypes.node,
        issueLogs: PropTypes.array
    }
    const { issueLogs } = props

    return (
        <Table aria-label="simple table" sx={{mt: 2}}>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={1}>&nbsp;</TableCell>
                    <TableCell align="center" colSpan={4}>定点観測</TableCell>
                    <TableCell align="center" colSpan={3}>差分観測</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>担当者名</TableCell>
                    <TableCell>担当チケット</TableCell>
                    <TableCell>今週期限</TableCell>
                    <TableCell>処理済み</TableCell>
                    <TableCell>期限切れ</TableCell>
                    <TableCell>期限日変更</TableCell>
                    <TableCell>追加</TableCell>
                    <TableCell>消化</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {issueLogs.map((issueLog, index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">{issueLog.name}</TableCell>
                        {issueLog.result.map((count, index) => (
                            <TableCell key={index}>{count}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
