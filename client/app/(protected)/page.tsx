import ConversationList from "@/components/home/ConversationList";
import PlusIcon from "@/components/icons/PlusIcon";
import Navbar from "@/components/navigations";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
const Home = () => {

  return (
    <Box component="main" className="flex min-h-screen flex-col">
      <Navbar />
      <Box position="relative" flexGrow={1} display="flex" flexDirection="column">
        <ConversationList />
        <Box position="absolute" bottom={25} right={25} borderRadius="50%" display="flex" alignItems="center" justifyContent="center" sx={{ backgroundColor: "primary.main", width: 50, height: 50 }}>
          <IconButton LinkComponent={Link} href="/new-conversation" disableRipple >
            <PlusIcon className="text-white" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;