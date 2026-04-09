import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Check, Upload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function ListHomeWizard() {
  const [step, setStep] = useState(1);

  const canProceed = () => {
    // Simplified - in real app would validate form fields
    return true;
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Top Bar */}
      <div className="border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <Link to="/" className="text-xl font-semibold">FinditWithFahad</Link>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2">List Your Home</h1>
        <p className="text-gray-600 mb-8">We'll help you get your property on the market</p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 max-w-3xl">
          {[
            { num: 1, label: "Property Info" },
            { num: 2, label: "Photos" },
            { num: 3, label: "Availability" },
            { num: 4, label: "Contact" },
            { num: 5, label: "Review" }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center">
                <div className={`size-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.num ? <Check className="size-5" /> : s.num}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${step >= s.num ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.label}
                  </div>
                </div>
              </div>
              {i < 4 && (
                <div className={`flex-1 h-px mx-2 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white border rounded-2xl p-8 mb-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Property Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input id="address" placeholder="123 Main Street" className="mt-1.5" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Calgary" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" placeholder="T2P 1J9" className="mt-1.5" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Property Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Family</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input id="beds" type="number" placeholder="3" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input id="baths" type="number" step="0.5" placeholder="2" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="sqft">Square Feet</Label>
                    <Input id="sqft" type="number" placeholder="1800" className="mt-1.5" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Tell us about any recent renovations, special features, or other details..."
                    className="mt-1.5"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Upload Photos</h2>
              <div className="border-2 border-dashed rounded-xl p-12 text-center">
                <Upload className="size-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-medium mb-2">Upload property photos</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop or click to browse
                </p>
                <Button variant="outline">Choose Files</Button>
                <p className="text-xs text-gray-500 mt-4">
                  Recommended: High-quality photos of exterior, interior, and key features
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Availability</h2>
              <div className="space-y-4">
                <div>
                  <Label>When can we schedule a property visit?</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <label className="border rounded-lg p-4 cursor-pointer hover:border-blue-600 transition-colors">
                      <input type="radio" name="availability" className="mr-2" />
                      Weekdays
                    </label>
                    <label className="border rounded-lg p-4 cursor-pointer hover:border-blue-600 transition-colors">
                      <input type="radio" name="availability" className="mr-2" />
                      Weekends
                    </label>
                    <label className="border rounded-lg p-4 cursor-pointer hover:border-blue-600 transition-colors">
                      <input type="radio" name="availability" className="mr-2" />
                      Anytime
                    </label>
                    <label className="border rounded-lg p-4 cursor-pointer hover:border-blue-600 transition-colors">
                      <input type="radio" name="availability" className="mr-2" />
                      Specific dates only
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferred-time">Preferred Time of Day</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Contact Preferences</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(403) 555-0123" className="mt-1.5" />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="mt-1.5" />
                </div>

                <div>
                  <Label>Preferred Contact Method</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <label className="border rounded-lg p-4 cursor-pointer hover:border-blue-600 transition-colors">
                      <input type="radio" name="contact" className="mr-2" />
                      Phone
                    </label>
                    <label className="border rounded-lg p-4 cursor-pointer hover:border-blue-600 transition-colors">
                      <input type="radio" name="contact" className="mr-2" />
                      Email
                    </label>
                    <label className="border rounded-lg p-4 cursor-pointer hover:border-blue-600 transition-colors">
                      <input type="radio" name="contact" className="mr-2" />
                      Either
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="text-center py-8">
                <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="size-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Request Submitted!</h2>
                <p className="text-gray-600 mb-8">
                  An agent will review your information and contact you shortly
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left mb-8">
                  <h3 className="font-semibold mb-4">Next Steps</h3>
                  <ol className="space-y-3 text-sm text-gray-600">
                    <li className="flex gap-3">
                      <span className="font-semibold text-blue-600">1.</span>
                      <span>An agent will review your listing request within 24 hours</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-blue-600">2.</span>
                      <span>They'll contact you to schedule a property assessment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-blue-600">3.</span>
                      <span>You'll receive a market analysis and pricing recommendation</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-blue-600">4.</span>
                      <span>Once approved, your listing will go live on our platform</span>
                    </li>
                  </ol>
                </div>

                <div className="flex gap-3 justify-center">
                  <Link to="/seller/dashboard">
                    <Button>View Dashboard</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline">Back to Home</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button 
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              {step === 4 ? "Submit Request" : "Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}