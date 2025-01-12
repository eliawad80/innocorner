import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface PageContent {
  id: number;
  page_name: string;
  content: any;
  updated_at: string;
}

export function PageContentManager() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [contentJson, setContentJson] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("page_name");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch pages",
        variant: "destructive",
      });
      return;
    }

    setPages(data);
  };

  const handlePageSelect = (page: PageContent) => {
    setSelectedPage(page);
    setContentJson(JSON.stringify(page.content, null, 2));
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    try {
      // Validate JSON
      const parsedContent = JSON.parse(contentJson);

      const { error } = await supabase
        .from("page_content")
        .update({
          content: parsedContent,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedPage.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page content updated successfully",
      });

      fetchPages();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {pages.map((page) => (
          <Button
            key={page.id}
            variant={selectedPage?.id === page.id ? "default" : "outline"}
            onClick={() => handlePageSelect(page)}
          >
            {page.page_name}
          </Button>
        ))}
      </div>

      {selectedPage && (
        <Card>
          <CardHeader>
            <CardTitle>Edit {selectedPage.page_name} Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={contentJson}
                onChange={(e) => setContentJson(e.target.value)}
                className="min-h-[400px] font-mono"
                placeholder="Enter JSON content..."
              />
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}