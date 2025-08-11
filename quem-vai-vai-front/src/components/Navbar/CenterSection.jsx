import { Event, Groups, Task } from "@mui/icons-material"
import { Box, Tab, Tabs } from "@mui/material"
import { motion } from "framer-motion"

const CenterSection = (props) => {

    const { tabs, tabValue, setTabValue } = props

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.8)',
                            minHeight: 48,
                            minWidth: 45,
                        },
                        '& .Mui-selected': {
                            color: 'white !important',
                            bgcolor: 'rgba(255,255,255,0.15)',
                            borderRadius: '12px'
                        },
                        '& .MuiTabs-indicator': {
                            display: 'none'
                        }
                    }}
                >
                    {
                        tabs && tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                icon={tab.icon}
                                label={tab.label}
                                sx={{ paddingInline: 3 }}
                                iconPosition="start"
                            />
                        ))
                    }
                </Tabs>
            </Box>
        </motion.div>
    )
}

export default CenterSection