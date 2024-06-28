import {Box} from "@mui/material"
import PropTypes from 'prop-types'

export const TabPanel = (props) => {
    TabPanel.propTypes = {
        children: PropTypes.node,
        value: PropTypes.number,
        index: PropTypes.number
    }

    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box py={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}
