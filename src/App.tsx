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
import { MainLayout } from "@/components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* CreatePost routes rendered outside MainLayout for full width */}
            <Route path="/community/post/create" element={<CreatePost />} />
            <Route path="/community/repost/:postId" element={<CreatePost />} />
            
            {/* All other routes rendered inside MainLayout */}
            <Route path="/" element={
              <MainLayout>
                <ComingSoonPage />
              </MainLayout>
            } />
            <Route path="/library" element={
              <MainLayout>
                <ComingSoonPage />
              </MainLayout>
            } />
            <Route path="/community" element={
              <MainLayout>
                <Community />
              </MainLayout>
            } />
            <Route path="/community/challenges" element={
              <MainLayout>
                <Community />
              </MainLayout>
            } />
            <Route path="/community/meetups" element={
              <MainLayout>
                <Community />
              </MainLayout>
            } />
            <Route path="/community/leaderboard" element={
              <MainLayout>
                <Community />
              </MainLayout>
            } />
            <Route path="/community/post/:postId" element={
              <MainLayout>
                <PostDetail />
              </MainLayout>
            } />
            <Route path="/community/repost-demo" element={
              <MainLayout>
                <RepostDemo />
              </MainLayout>
            } />
            <Route path="/profile" element={
              <MainLayout>
                <Profile />
              </MainLayout>
            } />
            <Route path="/notifications" element={
              <MainLayout>
                <NotificationsPage />
              </MainLayout>
            } />
            <Route path="/search" element={
              <MainLayout>
                <SearchPage />
              </MainLayout>
            } />
            <Route path="/messages" element={
              <MainLayout>
                <MessagesPage />
              </MainLayout>
            } />
            <Route path="/messages/:conversationId" element={
              <MainLayout>
                <ChatPage />
              </MainLayout>
            } />
            <Route path="/community/members" element={
              <MainLayout>
                <MembersList />
              </MainLayout>
            } />
            <Route path="*" element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;