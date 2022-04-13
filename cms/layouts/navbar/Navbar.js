import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import NavItem from './NavItem';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Navbar() {
  return (
    <section className="sticky top-0 bg-secondary pt-4 z-10">
      <div className="flex items-center justify-between bg-white rounded p-4 shadow-lg border">
        <div className="flex items-center">
          <NavItem Icon={MenuOutlinedIcon} className="xl:hidden" />
          <NavItem Icon={HomeOutlinedIcon} />
          <NavItem Icon={EmailOutlinedIcon} />
          <NavItem Icon={ChatBubbleOutlineOutlinedIcon} />
          <NavItem Icon={CheckBoxOutlinedIcon} />
        </div>

        <div className="flex items-center space-x-2">
          <div className="">
            <h4 className="text-sm font-medium">Chad Alexander</h4>
            <p className="text-xs text-right">Admin</p>
          </div>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
          </StyledBadge>
        </div>
      </div>
    </section>
  );
}
