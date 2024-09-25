"use client";

import React, { useEffect, useState } from 'react';
import { useUserContext } from '../UserContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Assuming you've imported shadcn components

interface Resource {
  title: string;
  description: string;
  link: string;
  preview?: string; // Optional preview link for the content
}

const resources: Resource[] = [
  {
    title: 'Anxiety NZ',
    description: 'We are here for all people living with anxiety and other mental health experiences in Aotearoa New Zealand.',
    link: 'https://anxiety.org.nz/',
    preview: 'https://anxiety.org.nz/preview', // Example preview URL (you could fetch this dynamically)
  },
  {
    title: 'Healthify',
    description: 'Another resource description with relevant details.',
    link: 'https://healthify.nz/',
    preview: 'https://healthify.nz/health-a-z/s/social-anxiety-disorder/',
  },
  {
    title: 'MHERC',
    description: 'A final resource with helpful content for the user.',
    link: 'https://mherc.org.nz/',
    preview: 'https://mherc.org.nz/directory/anxiety-services',
  },
];

const ProfilePage = () => {
  const { loggedInUser } = useUserContext();
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (loggedInUser) {
      console.log('Logged in user in ProfilePage:', loggedInUser);
      setUserDetails(loggedInUser);
    }
  }, [loggedInUser]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <Card className="shadow-lg rounded-lg p-6 mb-6 bg-white">
        <CardHeader>
          <CardTitle className="text-4xl font-semibold">@ {userDetails.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Country of Origin:</strong> {userDetails?.questionnaire?.country || 'N/A'}</p>
          <p><strong>Language:</strong> {userDetails?.questionnaire?.language || 'N/A'}</p>
          <p><strong>Degree:</strong> {userDetails?.questionnaire?.degree || 'N/A'}</p>
          <p><strong>Hobbies:</strong> {userDetails?.questionnaire?.hobbies?.join(', ') || 'N/A'}</p>
        </CardContent>
      </Card>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <Card key={index} className="shadow-md rounded-md bg-blue-50">
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {resource.description}
                  </CardDescription>
                  {/* Optional preview iframe */}
                  {resource.preview && (
                    <iframe
                      src={resource.preview}
                      title={resource.title}
                      className="w-full h-48 mt-4 border rounded-md"
                      sandbox="allow-same-origin allow-scripts"
                    />
                  )}
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;