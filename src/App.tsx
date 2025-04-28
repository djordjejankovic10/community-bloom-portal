import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Community from "./pages/Community";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { MembersList } from "@/components/community/MembersList";
// Repost functionality now integrated into CreatePost
import RepostDemo from "./pages/RepostDemo";
import NotificationsPage from "./pages/Notifications";
import SearchPage from "./pages/Search";
import MessagesPage from "./pages/Messages";
import ChatPage from "./pages/Chat";
import ComingSoonPage from "./pages/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ComingSoonPage />} />
            <Route path="/library" element={<ComingSoonPage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/post/create" element={<CreatePost />} />
            <Route path="/community/repost/:postId" element={<CreatePost />} />
            <Route path="/community/challenges" element={<Community />} />
            <Route path="/community/meetups" element={<Community />} />
            <Route path="/community/leaderboard" element={<Community />} />
            <Route path="/community/post/:postId" element={<PostDetail />} />
            <Route path="/community/repost-demo" element={<RepostDemo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:conversationId" element={<ChatPage />} />
            <Route path="/community/members" element={<MembersList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;