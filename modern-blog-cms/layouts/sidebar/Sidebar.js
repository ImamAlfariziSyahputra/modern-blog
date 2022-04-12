import SideLogo from './SideLogo';
import SideCategory from './SideCategory';
import SideItem from './SideItem';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Sidebar() {
  return (
    <section className="w-[261px] hidden xl:block shrink-0 h-screen sticky left-0 top-0 overflow-y-auto bg-white border-r-2 shadow-md border">
      <div className="flex flex-col">
        <SideLogo />

        <div className="flex flex-col space-y-4 px-6 pt-4">
          <SideItem href="/" Icon={HomeOutlinedIcon} name="">
            Dashboard
          </SideItem>
          <SideCategory name="App & Pages" />
          <SideItem Icon={ArticleOutlinedIcon} href="/blog">
            Post
          </SideItem>
          <SideItem Icon={EmailOutlinedIcon} href="">
            Email
          </SideItem>
          <SideItem Icon={ChatBubbleOutlineOutlinedIcon} href="">
            Chat
          </SideItem>
          <SideItem Icon={ShoppingCartOutlinedIcon} href="">
            E Commerce
          </SideItem>
        </div>
      </div>
    </section>
  );
}
