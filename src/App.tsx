import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage, SignUpPage } from '@/pages';
import { ChartersPage } from '@/pages/ChartersPage';
import { CreateCharterPage } from '@/pages/CreateCharterPage';
import { CharterDetailPage } from '@/pages/CharterDetailPage';
import { StakeholdersPage } from '@/pages/StakeholdersPage';
import { StakeholderMapsPage } from '@/pages/StakeholderMapsPage';
import { FeedbackPage } from '@/pages/FeedbackPage';
import { GuidesPage } from '@/pages/GuidesPage';
import { MainLayout } from '@/features/layout/components/MainLayout';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { ErrorBoundary } from '@/lib/hooks/useErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            }
          >
            <Route index element={<ChartersPage />} />
            <Route path="create" element={<CreateCharterPage />} />
            <Route path="charters/:id" element={<CharterDetailPage />} />
            <Route path="stakeholders" element={<StakeholdersPage />} />
            <Route path="stakeholder-maps" element={<StakeholderMapsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="guides" element={<GuidesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}