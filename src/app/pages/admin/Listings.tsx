import { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { Search, Filter, Eye, Edit, Check, X, Trash2, Flag, StickyNote } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { mockListings } from "../../data/mockData";

export default function AdminListings() {
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const selected = mockListings.find(l => l.id === selectedListing);

  return (
    <AdminLayout>
      <div className="flex h-full">
        {/* Main Table */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold mb-4">Manage Listings</h1>
            
            {/* Filters */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input placeholder="Search listings..." className="pl-10" />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Live</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-community">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-community">All Communities</SelectItem>
                  <SelectItem value="elbow">Elbow Park</SelectItem>
                  <SelectItem value="kensington">Kensington</SelectItem>
                  <SelectItem value="mission">Mission</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="size-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Flags</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockListings.map((listing) => (
                  <TableRow 
                    key={listing.id}
                    className={`cursor-pointer ${selectedListing === listing.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedListing(listing.id)}
                  >
                    <TableCell>
                      <Badge variant={listing.status === "active" ? "default" : "outline"}>
                        {listing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{listing.address}</div>
                      <div className="text-sm text-gray-600">{listing.community}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${listing.price.toLocaleString()}
                    </TableCell>
                    <TableCell>{listing.agentName}</TableCell>
                    <TableCell>
                      {new Date(listing.dateAdded).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {(listing.flags || 0) > 0 ? (
                        <Badge variant="destructive">{listing.flags}</Badge>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {listing.notes ? (
                        <div className="flex items-center gap-2">
                          <StickyNote className="size-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600 truncate max-w-[180px]">
                            {listing.notes}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" onClick={(e) => {
                          e.stopPropagation();
                          setSelectedListing(listing.id);
                        }}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="size-4" />
                        </Button>
                        {listing.status === "pending" && (
                          <>
                            <Button variant="ghost" size="icon">
                              <Check className="size-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <X className="size-4 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Drawer */}
        {selectedListing && selected && (
          <div className="w-96 border-l flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Listing Preview</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedListing(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4">
                <img 
                  src={selected.images[0]} 
                  alt={selected.address}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Address</div>
                  <div className="font-medium">{selected.address}</div>
                  <div className="text-sm text-gray-600">{selected.city}, {selected.postalCode}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Price</div>
                  <div className="text-2xl font-semibold">${selected.price.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Beds</div>
                    <div className="font-medium">{selected.beds}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Baths</div>
                    <div className="font-medium">{selected.baths}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Sqft</div>
                    <div className="font-medium">{selected.sqft.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Type</div>
                  <div className="font-medium">{selected.type}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Agent</div>
                  <div className="font-medium">{selected.agentName}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <Badge variant={selected.status === "active" ? "default" : "outline"}>
                    {selected.status}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Description</div>
                  <p className="text-sm">{selected.description}</p>
                </div>

                {selected.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-900 mb-1">
                      <StickyNote className="size-4" />
                      <span className="font-medium">Notes</span>
                    </div>
                    <p className="text-sm text-blue-800">{selected.notes}</p>
                  </div>
                )}

                {(selected.flags || 0) > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-900 mb-1">
                      <Flag className="size-4" />
                      <span className="font-medium">{selected.flags} Flag(s)</span>
                    </div>
                    <p className="text-sm text-red-800">This listing has been flagged for review</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t space-y-2">
              {selected.status === "pending" && (
                <>
                  <Button className="w-full">
                    <Check className="size-4 mr-2" />
                    Approve Listing
                  </Button>
                  <Button variant="outline" className="w-full">
                    <X className="size-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
              {selected.status === "active" && (
                <>
                  <Button variant="outline" className="w-full">
                    <StickyNote className="size-4 mr-2" />
                    Add Note
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Trash2 className="size-4 mr-2" />
                    Remove Listing
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}