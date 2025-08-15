import { AccessTime, Event, People, Settings } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography, useTheme } from "@mui/material"


const GroupsCards = (props) => {

    const theme = useTheme()
    const { title, description, daystonextevent, memberCount, eventCount, onEdit } = props
    return (
        <Grid item size={{ sm: 12, md: 6, lg: 4 }}>
            <Card sx={{ borderTop: `1px ridge ${theme.palette.primary.main}`, borderRadius: 3 }}>
                <CardHeader
                    title={title}
                    action={
                        <Button
                            //variant="ghost"
                            size="xs"
                            sx={{ marginRight: 1 }}
                        >
                            <Settings className="h-4 w-4" onClick={onEdit} />
                        </Button>
                    }
                    sx={{ padding: 2 }}

                />
                <CardContent>

                    {/* Descrição */}
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {description}
                    </Typography>

                    {/* Informações */}
                    <Stack direction="row" spacing={3} alignItems="center" sx={{ mt: 2 }} justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <People fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" fontWeight="medium">
                                {memberCount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                membros
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <Event fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" fontWeight="medium">
                                {eventCount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                eventos
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2, ml: 48 }} justifySelf="end">
                            <Chip
                                icon={<AccessTime />}
                                label={daystonextevent ? `Próximo evento em ${daystonextevent} dias` : "Sem evento marcado"}
                                color={daystonextevent ? daystonextevent > 7 ? "info" : "success" : "error"}
                                size="small"
                                sx={{ fontWeight: 'medium' }}
                            />
                        </Box>
                    </Stack>

                    {/* Status */}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default GroupsCards