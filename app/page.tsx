'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Search, Palette } from 'lucide-react';
import Link from 'next/link';
import { Page } from '@/types';
import { getStorageData } from '@/lib/storage';

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [recentPages, setRecentPages] = useState<Page[]>([]);

  useEffect(() => {
    const appState = process.env.NEXT_PUBLIC_APP_STATE;
    setIsEditMode(appState === 'edit');

    const data = getStorageData();
    setPages(data.pages);
    setRecentPages(data.pages.slice(0, 3));
  }, []);

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Rich Text Editor',
      description: 'Create beautiful content with our powerful editor'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Category Organization',
      description: 'Organize your documentation with categories'
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: 'Advanced Search',
      description: 'Find content quickly with full-text search'
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Dark/Light Mode',
      description: 'Switch between themes for comfortable reading'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isEditMode={isEditMode} />

      <div className="flex">
        <Sidebar isEditMode={isEditMode} />

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Documentation System</h1>
              <p className="text-xl text-muted-foreground mb-8">
                A modern, beautiful documentation platform built with Next.js
              </p>

              <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/docs/getting-started">Get Started</Link>
                </Button>
                {isEditMode && (
                  <Button asChild variant="outline" size="lg">
                    <Link href="/admin/pages/new">Create New Page</Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className="border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.icon}
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {isEditMode && recentPages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Pages</h2>
                <div className="grid gap-4">
                  {recentPages.map((page) => (
                    <Card key={page.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              <Link href={`/docs/${page.slug}`} className="hover:text-primary">
                                {page.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {page.description}
                            </CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {page.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}