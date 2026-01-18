'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface ProfileData {
  full_name: string;
  github_url: string;
  resume_url: string;
  motivation: string;
  challenge_url: string;
}

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    github_url: '',
    resume_url: '',
    motivation: '',
    challenge_url: '',
  });
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (hasRedirected || isLoading) return;

    if (!user) {
      setHasRedirected(true);
      router.push('/auth/signin');
    }
  }, [user, isLoading, router, hasRedirected]);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoadingProfile(true);
      const response = await api.get('/user/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (profile.motivation.length < 50) {
      alert('Motivation must be at least 50 characters');
      return;
    }

    try {
      setIsSaving(true);
      await api.put('/user/profile', profile);
      setIsEditing(false);
      await fetchProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="text-gray-600 mt-2">Manage your XBorg challenge profile</p>
          </div>
          <div className="flex space-x-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Profile"
                className="h-16 w-16 rounded-full"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-2xl text-gray-600">
                  {user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{user?.full_name || 'No name set'}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Your full name"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.full_name || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
              {isEditing ? (
                <input
                  type="url"
                  name="github_url"
                  value={profile.github_url}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="https://github.com/username"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profile.github_url ? (
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profile.github_url}
                    </a>
                  ) : 'Not set'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Resume/Portfolio URL</label>
              {isEditing ? (
                <input
                  type="url"
                  name="resume_url"
                  value={profile.resume_url}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="https://yourportfolio.dev"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profile.resume_url ? (
                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profile.resume_url}
                    </a>
                  ) : 'Not set'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Motivation (Min. 50 characters)
                {isEditing && (
                  <span className="text-xs text-gray-500 ml-2">
                    {profile.motivation.length}/50 characters
                  </span>
                )}
              </label>
              {isEditing ? (
                <textarea
                  name="motivation"
                  value={profile.motivation}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Why you want to work at XBorg and why you're a good fit..."
                  minLength={50}
                />
              ) : (
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                  {profile.motivation || 'Not set'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Challenge URL</label>
              {isEditing ? (
                <input
                  type="url"
                  name="challenge_url"
                  value={profile.challenge_url}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="https://github.com/username/xborg-challenge"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profile.challenge_url ? (
                    <a href={profile.challenge_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profile.challenge_url}
                    </a>
                  ) : 'Not set'}
                </p>
              )}
            </div>
          </div>

          {isEditing && profile.motivation.length < 50 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-700">
                Motivation must be at least 50 characters. Currently: {profile.motivation.length} characters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
