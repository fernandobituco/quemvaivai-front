import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem, Tooltip, useTheme } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = (lang) => {
    if (lang) i18n.changeLanguage(lang)
    setAnchorEl(null)
  };

  return (
    <>
      <Tooltip title="Change Language">
        <IconButton
          onClick={handleClick}
          color='primary'
          size="large"
          aria-label="change language"
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleClose('pt-BR')}>Português</MenuItem>
        <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSwitcher