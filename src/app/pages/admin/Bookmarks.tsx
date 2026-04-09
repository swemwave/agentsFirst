import { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { Search, Plus, ExternalLink, Edit, Trash2, X } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { mockBookmarks, Bookmark } from "../../data/mockData";

export default function AdminBookmarks() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const groups = [...new Set(mockBookmarks.map(b => b.group))];
  
  const filteredBookmarks = mockBookmarks.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedBookmarks = groups.map(group => ({
    name: group,
    bookmarks: filteredBookmarks.filter(b => b.group === group)
  })).filter(g => g.bookmarks.length > 0);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Bookmarks Hub</h1>
            <p className="text-gray-600">
              Quick access to frequently used external tools and resources
            </p>
          </div>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                Add Bookmark
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bookmark</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="e.g. Pillar 9" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" type="url" placeholder="https://..." className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="group">Group</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map(group => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                      <SelectItem value="new">+ Create new group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="e.g. mls, listings" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea id="notes" placeholder="Additional notes..." className="mt-1.5" rows={3} />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Add Bookmark</Button>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search bookmarks..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Bookmark Groups */}
        <div className="space-y-6">
          {groupedBookmarks.map(group => (
            <div key={group.name} className="border rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold">{group.name}</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {group.bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow group">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1 truncate">{bookmark.name}</h4>
                          <a 
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1 truncate"
                          >
                            <span className="truncate">{bookmark.url}</span>
                            <ExternalLink className="size-3 flex-shrink-0" />
                          </a>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                          <Button variant="ghost" size="icon" className="size-8">
                            <Edit className="size-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="size-8">
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 flex-wrap mb-2">
                        {bookmark.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {bookmark.notes && (
                        <p className="text-sm text-gray-600">{bookmark.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {groupedBookmarks.length === 0 && (
            <div className="text-center py-12 border rounded-xl">
              <Search className="size-12 mx-auto mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">No bookmarks found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or add a new bookmark</p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="size-4 mr-2" />
                Add Bookmark
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
