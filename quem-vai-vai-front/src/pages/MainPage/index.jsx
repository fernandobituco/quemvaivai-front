"use client"

import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  IconButton,
  Avatar,
  Container,
  Card,
  CardContent,
  Grid,
  Fab,
  useTheme,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material'
import {
  Groups as GroupsIcon,
  Event as EventIcon,
  Task as TaskIcon,
  Add as AddIcon,
  Person as PersonIcon,
  DarkMode as DarkModeIcon,
  Language as LanguageIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import NavigationBar from '@/components/Navbar'

function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const MainPage = () => {
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const mockData = {
    grupos: [
      { id: 1, nome: 'Equipe de Desenvolvimento', membros: 8, ativo: true },
      { id: 2, nome: 'Marketing Digital', membros: 5, ativo: true },
      { id: 3, nome: 'Recursos Humanos', membros: 3, ativo: false }
    ],
    eventos: [
      { id: 1, titulo: 'Reunião Semanal', data: '2024-01-15', participantes: 12 },
      { id: 2, titulo: 'Workshop de UX', data: '2024-01-18', participantes: 25 },
      { id: 3, titulo: 'Apresentação Trimestral', data: '2024-01-22', participantes: 45 }
    ],
    tarefas: [
      { id: 1, titulo: 'Revisar documentação', status: 'Em andamento', prioridade: 'Alta' },
      { id: 2, titulo: 'Implementar nova feature', status: 'Pendente', prioridade: 'Média' },
      { id: 3, titulo: 'Testes de usabilidade', status: 'Concluída', prioridade: 'Baixa' }
    ]
  }

  const renderContent = () => {
    const contents = [
      // Grupos
      <motion.div
        key="grupos"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3} justifyContent="center">
          {mockData.grupos.map((grupo) => (
            <Grid item xs={12} sm={6} md={4} key={grupo.id}>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <GroupsIcon sx={{ color: '#8e44ad', mr: 1 }} />
                      <Typography variant="h6" component="h3">
                        {grupo.nome}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      {grupo.membros} membros
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: grupo.ativo ? '#e8f5e8' : '#ffeaa7',
                        color: grupo.ativo ? '#27ae60' : '#f39c12'
                      }}
                    >
                      <Typography variant="caption">
                        {grupo.ativo ? 'Ativo' : 'Inativo'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>,

      // Eventos
      <motion.div
        key="eventos"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3} justifyContent="center">
          {mockData.eventos.map((evento) => (
            <Grid item xs={12} sm={6} md={4} key={evento.id}>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <EventIcon sx={{ color: '#8e44ad', mr: 1 }} />
                      <Typography variant="h6" component="h3">
                        {evento.titulo}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Data: {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </Typography>
                    <Typography variant="body2">
                      {evento.participantes} participantes
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>,

      // Tarefas
      <motion.div
        key="tarefas"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3} justifyContent="center">
          {mockData.tarefas.map((tarefa) => (
            <Grid item xs={12} sm={6} md={4} key={tarefa.id}>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TaskIcon sx={{ color: '#8e44ad', mr: 1 }} />
                      <Typography variant="h6" component="h3">
                        {tarefa.titulo}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Status: {tarefa.status}
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: 
                          tarefa.prioridade === 'Alta' ? '#ffebee' :
                          tarefa.prioridade === 'Média' ? '#fff3e0' : '#e8f5e8',
                        color:
                          tarefa.prioridade === 'Alta' ? '#d32f2f' :
                          tarefa.prioridade === 'Média' ? '#f57c00' : '#388e3c'
                      }}
                    >
                      <Typography variant="caption">
                        {tarefa.prioridade}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    ]

    return contents[tabValue]
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Modern Navigation Header */}
      <NavigationBar
        userName="João Silva"
        notificationCount={5}
        tabValue={tabValue}
        onTabChange={handleTabChange}
        onProfileClick={() => console.log('Profile clicked')}
        onNotificationClick={() => console.log('Notifications clicked')}
        onThemeToggle={() => console.log('Theme toggled')}
        onLanguageToggle={() => console.log('Language toggled')}
      />

      {/* Main Content */}
      <Container 
        sx={{ 
          py: 3, 
          pb: isMobile ? 10 : 3,
          minHeight: 'calc(100vh - 140px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                color: '#2c3e50',
                fontWeight: 'bold',
                mb: 4,
                fontSize: isMobile ? '1.5rem' : '2rem'
              }}
            >
              {['Grupos', 'Eventos', 'Tarefas'][tabValue]}
            </Typography>
          </motion.div>

          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </Box>
      </Container>

      {/* FAB */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: isMobile ? 80 : 16,
          right: 16,
          bgcolor: '#8e44ad',
          '&:hover': {
            bgcolor: '#7d3c98'
          }
        }}
      >
        <AddIcon />
      </Fab>

      {/* Bottom Navigation - Mobile */}
      {isMobile && (
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: 1000
          }} 
          elevation={3}
        >
          <BottomNavigation
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            sx={{
              '& .Mui-selected': {
                color: '#8e44ad !important'
              }
            }}
          >
            <BottomNavigationAction
              label="Grupos"
              icon={<GroupsIcon />}
            />
            <BottomNavigationAction
              label="Eventos"
              icon={<EventIcon />}
            />
            <BottomNavigationAction
              label="Tarefas"
              icon={<TaskIcon />}
            />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  )
}

export default MainPage