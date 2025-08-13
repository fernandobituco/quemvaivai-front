import { Box, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const AppInfo = (props) => {
    
    const { isMobile } = props
    const { t } = useTranslation() 
    return (
        <motion.div
            initial={isMobile ? {opacity: 0, y: -20} : { opacity: 0, x: -60 }}
            animate={isMobile ? {opacity: 1, y: 0} : { opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: 'linear-gradient(45deg, #fff 0%, #f8f9fa 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#8e44ad',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}
                    >
                        Q
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.3rem',
                            letterSpacing: '-0.5px'
                        }}
                    >
                        Quem Vai Vai
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '0.75rem',
                            display: 'block',
                            lineHeight: 1
                        }}
                    >
                        {t('logo')}
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    )
}

export default AppInfo