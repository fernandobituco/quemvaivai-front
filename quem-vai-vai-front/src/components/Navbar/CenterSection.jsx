import { Event, Groups, Task } from "@mui/icons-material"
import { Box, Tab, Tabs } from "@mui/material"
import { motion } from "framer-motion"

const CenterSection = (props) => {

    const { tabValue, setTabValue, isMobile } = props

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
                    <Tab
                        icon={<Groups />}
                        label={isMobile ? "" : "Grupos"}
                        sx={{ paddingInline: isMobile ? 0 : 3 }}
                        iconPosition="start"
                    />
                    <Tab
                        icon={<Event />}
                        label={isMobile ? "" : "Eventos"}
                        sx={{ paddingInline: isMobile ? 0 : 3 }}
                        iconPosition="start"
                    />
                    <Tab
                        icon={<Task />}
                        label={isMobile ? "" : "Tarefas"}
                        sx={{ paddingInline: isMobile ? 0 : 3 }}
                        iconPosition="start"
                    />
                </Tabs>
            </Box>
        </motion.div>
    )
}

export default CenterSection