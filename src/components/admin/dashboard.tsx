"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipboardList, ExternalLink, HardHat, LogOut, Loader2, Mail, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrayEditor } from "@/components/admin/array-editor";
import { Field } from "@/components/admin/field";
import { IconPicker } from "@/components/admin/icon-picker";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { ContactMessageDTO } from "@/lib/messages";
import type { LabourRequestDTO } from "@/lib/requests";
import type { RoleTone, SiteContent } from "@/lib/content-types";

interface AdminDashboardProps {
  initialContent: SiteContent;
}

type SaveState = "idle" | "saving" | "saved" | "error";

const ROLE_TONE_LABELS: Record<RoleTone, string> = { blue: "Blue", green: "Green", amber: "Amber" };

export function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingCount, setUploadingCount] = useState(0);

  const trackUploading = (uploading: boolean) =>
    setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));

  const updateHero = (patch: Partial<SiteContent["hero"]>) =>
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  const updateServicesMeta = (patch: Partial<Omit<SiteContent["services"], "items">>) =>
    setContent((c) => ({ ...c, services: { ...c.services, ...patch } }));
  const updateRequestSection = (patch: Partial<Omit<SiteContent["requestSection"], "steps">>) =>
    setContent((c) => ({ ...c, requestSection: { ...c.requestSection, ...patch } }));
  const updateFindLabourMeta = (
    patch: Partial<Omit<SiteContent["findLabour"], "workers" | "mapPins">>
  ) => setContent((c) => ({ ...c, findLabour: { ...c.findLabour, ...patch } }));
  const updateContact = (patch: Partial<SiteContent["contact"]>) =>
    setContent((c) => ({ ...c, contact: { ...c.contact, ...patch } }));
  const updateAboutPage = (patch: Partial<Omit<SiteContent["aboutPage"], "stats" | "team">>) =>
    setContent((c) => ({ ...c, aboutPage: { ...c.aboutPage, ...patch } }));
  const updateContactPage = (patch: Partial<SiteContent["contactPage"]>) =>
    setContent((c) => ({ ...c, contactPage: { ...c.contactPage, ...patch } }));
  const updateServicesPage = (patch: Partial<SiteContent["servicesPage"]>) =>
    setContent((c) => ({ ...c, servicesPage: { ...c.servicesPage, ...patch } }));
  const updateFindLabourPage = (patch: Partial<SiteContent["findLabourPage"]>) =>
    setContent((c) => ({ ...c, findLabourPage: { ...c.findLabourPage, ...patch } }));

  async function handleSave() {
    setSaveState("saving");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to save changes");
      }
      setSaveState("saved");
      router.refresh();
      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2500);
    } catch (err) {
      setSaveState("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to save changes");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-16">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-950 text-white">
              <HardHat className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="font-heading text-sm font-semibold">Shromik Admin</p>
              <p className="text-xs text-muted-foreground">Manage your site content</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveState === "saved" && (
              <span className="text-sm text-emerald-600">Saved</span>
            )}
            {saveState === "error" && (
              <span className="text-sm text-destructive">{errorMessage}</span>
            )}
            {uploadingCount > 0 && (
              <span className="text-sm text-muted-foreground">Uploading image…</span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              nativeButton={false}
              render={<a href="/" target="_blank" />}
            >
              <ExternalLink className="size-3.5" />
              View Site
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={handleLogout}>
              <LogOut className="size-3.5" />
              Logout
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-blue-950 text-white hover:bg-blue-900"
              onClick={handleSave}
              disabled={saveState === "saving" || uploadingCount > 0}
            >
              {saveState === "saving" && <Loader2 className="size-3.5 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <Tabs defaultValue="hero">
          <TabsList className="flex-wrap">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="trust">Trust Points</TabsTrigger>
            <TabsTrigger value="contact-bar">Contact Bar</TabsTrigger>
            <TabsTrigger value="about-page">About Page</TabsTrigger>
            <TabsTrigger value="contact-page">Contact Page</TabsTrigger>
            <TabsTrigger value="services-page">Services Page</TabsTrigger>
            <TabsTrigger value="find-labour-page">Find Labour Page</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <Card>
              <Field label="Hero Image">
                <ImageUploadField
                  value={content.hero.imagePublicId}
                  onChange={(imagePublicId) => updateHero({ imagePublicId })}
                  onUploadingChange={trackUploading}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Title Line 1">
                  <Input value={content.hero.titleLine1} onChange={(e) => updateHero({ titleLine1: e.target.value })} />
                </Field>
                <Field label="Title Line 2">
                  <Input value={content.hero.titleLine2} onChange={(e) => updateHero({ titleLine2: e.target.value })} />
                </Field>
                <Field label="Title Highlight">
                  <Input value={content.hero.titleHighlight} onChange={(e) => updateHero({ titleHighlight: e.target.value })} />
                </Field>
              </div>

              <Field label="Subtitle">
                <Textarea
                  value={content.hero.subtitle}
                  onChange={(e) => updateHero({ subtitle: e.target.value })}
                  className="min-h-16 resize-none"
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Primary CTA">
                  <Input value={content.hero.ctaPrimary} onChange={(e) => updateHero({ ctaPrimary: e.target.value })} />
                </Field>
                <Field label="Secondary CTA">
                  <Input value={content.hero.ctaSecondary} onChange={(e) => updateHero({ ctaSecondary: e.target.value })} />
                </Field>
                <Field label="How It Works Video (YouTube URL)" className="sm:col-span-2">
                  <Input
                    value={content.hero.howItWorksVideoUrl}
                    onChange={(e) => updateHero({ howItWorksVideoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </Field>
                <Field label="Rating Value">
                  <Input value={content.hero.ratingValue} onChange={(e) => updateHero({ ratingValue: e.target.value })} />
                </Field>
                <Field label="Rating Label">
                  <Input value={content.hero.ratingLabel} onChange={(e) => updateHero({ ratingLabel: e.target.value })} />
                </Field>
                <Field label="Search Heading">
                  <Input value={content.hero.searchHeading} onChange={(e) => updateHero({ searchHeading: e.target.value })} />
                </Field>
                <Field label="Search Placeholder">
                  <Input
                    value={content.hero.searchPlaceholder}
                    onChange={(e) => updateHero({ searchPlaceholder: e.target.value })}
                  />
                </Field>
                <Field label="Search Button Label">
                  <Input value={content.hero.searchButton} onChange={(e) => updateHero({ searchButton: e.target.value })} />
                </Field>
              </div>

              <SectionTitle>Stats</SectionTitle>
              <ArrayEditor
                items={content.hero.stats}
                onChange={(stats) => updateHero({ stats })}
                newItem={() => ({ icon: "zap", value: "0", label: "New stat" })}
                addLabel="Add stat"
                minItems={1}
                renderItem={(stat, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Icon">
                      <IconPicker value={stat.icon} onChange={(icon) => update({ icon })} />
                    </Field>
                    <Field label="Value">
                      <Input value={stat.value} onChange={(e) => update({ value: e.target.value })} />
                    </Field>
                    <Field label="Label">
                      <Input value={stat.label} onChange={(e) => update({ label: e.target.value })} />
                    </Field>
                  </div>
                )}
              />

              <SectionTitle>Popular Searches</SectionTitle>
              <TagListEditor
                items={content.hero.popularSearches}
                onChange={(popularSearches) => updateHero({ popularSearches })}
              />
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Card>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Section Heading">
                  <Input value={content.services.heading} onChange={(e) => updateServicesMeta({ heading: e.target.value })} />
                </Field>
                <Field label="Section Subheading">
                  <Input
                    value={content.services.subheading}
                    onChange={(e) => updateServicesMeta({ subheading: e.target.value })}
                  />
                </Field>
              </div>

              <SectionTitle>Services</SectionTitle>
              <ArrayEditor
                items={content.services.items}
                onChange={(items) => setContent((c) => ({ ...c, services: { ...c.services, items } }))}
                newItem={() => ({ icon: "wrench", title: "New Service", description: "Description" })}
                addLabel="Add service"
                minItems={1}
                renderItem={(service, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Icon">
                      <IconPicker value={service.icon} onChange={(icon) => update({ icon })} />
                    </Field>
                    <Field label="Title">
                      <Input value={service.title} onChange={(e) => update({ title: e.target.value })} />
                    </Field>
                    <Field label="Description">
                      <Input value={service.description} onChange={(e) => update({ description: e.target.value })} />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="steps" className="mt-6">
            <Card>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading Line 1">
                  <Input
                    value={content.requestSection.headingLine1}
                    onChange={(e) => updateRequestSection({ headingLine1: e.target.value })}
                  />
                </Field>
                <Field label="Heading Highlight">
                  <Input
                    value={content.requestSection.headingHighlight}
                    onChange={(e) => updateRequestSection({ headingHighlight: e.target.value })}
                  />
                </Field>
                <Field label="Form Heading">
                  <Input
                    value={content.requestSection.formHeading}
                    onChange={(e) => updateRequestSection({ formHeading: e.target.value })}
                  />
                </Field>
                <Field label="Submit Button Label">
                  <Input
                    value={content.requestSection.submitLabel}
                    onChange={(e) => updateRequestSection({ submitLabel: e.target.value })}
                  />
                </Field>
              </div>

              <SectionTitle>Steps</SectionTitle>
              <ArrayEditor
                items={content.requestSection.steps}
                onChange={(steps) =>
                  setContent((c) => ({ ...c, requestSection: { ...c.requestSection, steps } }))
                }
                newItem={() => ({ title: "New Step", description: "Description" })}
                addLabel="Add step"
                minItems={1}
                renderItem={(step, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <Input value={step.title} onChange={(e) => update({ title: e.target.value })} />
                    </Field>
                    <Field label="Description">
                      <Input value={step.description} onChange={(e) => update({ description: e.target.value })} />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="workers" className="mt-6">
            <Card>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Section Heading">
                  <Input
                    value={content.findLabour.heading}
                    onChange={(e) => updateFindLabourMeta({ heading: e.target.value })}
                  />
                </Field>
                <Field label="Section Subheading">
                  <Input
                    value={content.findLabour.subheading}
                    onChange={(e) => updateFindLabourMeta({ subheading: e.target.value })}
                  />
                </Field>
              </div>

              <SectionTitle>Workers</SectionTitle>
              <ArrayEditor
                items={content.findLabour.workers}
                onChange={(workers) =>
                  setContent((c) => ({ ...c, findLabour: { ...c.findLabour, workers } }))
                }
                newItem={() => ({
                  name: "New Worker",
                  role: "Helper",
                  roleTone: "blue" as RoleTone,
                  rating: 4.5,
                  experience: "1 year experience",
                  location: "Dhaka",
                })}
                addLabel="Add worker"
                minItems={0}
                renderItem={(worker, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Name">
                      <Input value={worker.name} onChange={(e) => update({ name: e.target.value })} />
                    </Field>
                    <Field label="Role">
                      <Input value={worker.role} onChange={(e) => update({ role: e.target.value })} />
                    </Field>
                    <Field label="Role Color">
                      <Select
                        value={worker.roleTone}
                        onValueChange={(v) => v && update({ roleTone: v as RoleTone })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue>
                            {(v: RoleTone) => ROLE_TONE_LABELS[v] ?? v}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="amber">Amber</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Rating">
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={worker.rating}
                        onChange={(e) => update({ rating: Number(e.target.value) })}
                      />
                    </Field>
                    <Field label="Experience">
                      <Input value={worker.experience} onChange={(e) => update({ experience: e.target.value })} />
                    </Field>
                    <Field label="Location">
                      <Input value={worker.location} onChange={(e) => update({ location: e.target.value })} />
                    </Field>
                  </div>
                )}
              />

              <SectionTitle>Map Pins</SectionTitle>
              <ArrayEditor
                items={content.findLabour.mapPins}
                onChange={(mapPins) =>
                  setContent((c) => ({ ...c, findLabour: { ...c.findLabour, mapPins } }))
                }
                newItem={() => ({ label: "New Area", top: "50%", left: "50%" })}
                addLabel="Add pin"
                minItems={0}
                renderItem={(pin, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Label">
                      <Input value={pin.label} onChange={(e) => update({ label: e.target.value })} />
                    </Field>
                    <Field label="Top (%)">
                      <Input value={pin.top} onChange={(e) => update({ top: e.target.value })} />
                    </Field>
                    <Field label="Left (%)">
                      <Input value={pin.left} onChange={(e) => update({ left: e.target.value })} />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="trust" className="mt-6">
            <Card>
              <SectionTitle>Trust Points</SectionTitle>
              <ArrayEditor
                items={content.trustPoints}
                onChange={(trustPoints) => setContent((c) => ({ ...c, trustPoints }))}
                newItem={() => ({ icon: "shield-check", title: "New Point", description: "Description" })}
                addLabel="Add trust point"
                minItems={1}
                renderItem={(point, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Icon">
                      <IconPicker value={point.icon} onChange={(icon) => update({ icon })} />
                    </Field>
                    <Field label="Title">
                      <Input value={point.title} onChange={(e) => update({ title: e.target.value })} />
                    </Field>
                    <Field label="Description">
                      <Input value={point.description} onChange={(e) => update({ description: e.target.value })} />
                    </Field>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="contact-bar" className="mt-6">
            <Card>
              <p className="text-xs text-muted-foreground">
                This is the dark blue bar at the bottom of every page.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Help Title">
                  <Input value={content.contact.helpTitle} onChange={(e) => updateContact({ helpTitle: e.target.value })} />
                </Field>
                <Field label="Help Text">
                  <Input value={content.contact.helpText} onChange={(e) => updateContact({ helpText: e.target.value })} />
                </Field>
                <Field label="Phone Label">
                  <Input value={content.contact.phoneLabel} onChange={(e) => updateContact({ phoneLabel: e.target.value })} />
                </Field>
                <Field label="Phone Number">
                  <Input value={content.contact.phone} onChange={(e) => updateContact({ phone: e.target.value })} />
                </Field>
                <Field label="Phone Note">
                  <Input value={content.contact.phoneNote} onChange={(e) => updateContact({ phoneNote: e.target.value })} />
                </Field>
                <Field label="WhatsApp Button Label">
                  <Input
                    value={content.contact.whatsappLabel}
                    onChange={(e) => updateContact({ whatsappLabel: e.target.value })}
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="about-page" className="mt-6">
            <Card>
              <p className="text-xs text-muted-foreground">Content for the /about page.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input value={content.aboutPage.heading} onChange={(e) => updateAboutPage({ heading: e.target.value })} />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.aboutPage.subheading}
                    onChange={(e) => updateAboutPage({ subheading: e.target.value })}
                  />
                </Field>
                <Field label="Story Heading">
                  <Input
                    value={content.aboutPage.storyHeading}
                    onChange={(e) => updateAboutPage({ storyHeading: e.target.value })}
                  />
                </Field>
                <Field label="Mission Heading">
                  <Input
                    value={content.aboutPage.missionHeading}
                    onChange={(e) => updateAboutPage({ missionHeading: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Mission Text">
                <Textarea
                  value={content.aboutPage.missionText}
                  onChange={(e) => updateAboutPage({ missionText: e.target.value })}
                  className="min-h-16 resize-none"
                />
              </Field>

              <SectionTitle>Story Paragraphs</SectionTitle>
              <ArrayEditor
                items={content.aboutPage.storyParagraphs.map((text) => ({ text }))}
                onChange={(items) =>
                  setContent((c) => ({
                    ...c,
                    aboutPage: { ...c.aboutPage, storyParagraphs: items.map((i) => i.text) },
                  }))
                }
                newItem={() => ({ text: "New paragraph" })}
                addLabel="Add paragraph"
                minItems={1}
                renderItem={(item, update) => (
                  <Field label="Paragraph">
                    <Textarea
                      value={item.text}
                      onChange={(e) => update({ text: e.target.value })}
                      className="min-h-16 resize-none"
                    />
                  </Field>
                )}
              />

              <SectionTitle>Stats</SectionTitle>
              <ArrayEditor
                items={content.aboutPage.stats}
                onChange={(stats) =>
                  setContent((c) => ({ ...c, aboutPage: { ...c.aboutPage, stats } }))
                }
                newItem={() => ({ icon: "zap", value: "0", label: "New stat" })}
                addLabel="Add stat"
                minItems={1}
                renderItem={(stat, update) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Icon">
                      <IconPicker value={stat.icon} onChange={(icon) => update({ icon })} />
                    </Field>
                    <Field label="Value">
                      <Input value={stat.value} onChange={(e) => update({ value: e.target.value })} />
                    </Field>
                    <Field label="Label">
                      <Input value={stat.label} onChange={(e) => update({ label: e.target.value })} />
                    </Field>
                  </div>
                )}
              />

              <SectionTitle>Team</SectionTitle>
              <ArrayEditor
                items={content.aboutPage.team}
                onChange={(team) =>
                  setContent((c) => ({ ...c, aboutPage: { ...c.aboutPage, team } }))
                }
                newItem={() => ({ name: "New Person", role: "Role", bio: "Short bio", imagePublicId: null })}
                addLabel="Add team member"
                minItems={0}
                renderItem={(member, update) => (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <ImageUploadField
                      value={member.imagePublicId}
                      onChange={(imagePublicId) => update({ imagePublicId })}
                      onUploadingChange={trackUploading}
                    />
                    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Name">
                        <Input value={member.name} onChange={(e) => update({ name: e.target.value })} />
                      </Field>
                      <Field label="Role">
                        <Input value={member.role} onChange={(e) => update({ role: e.target.value })} />
                      </Field>
                      <Field label="Bio" className="sm:col-span-2">
                        <Input value={member.bio} onChange={(e) => update({ bio: e.target.value })} />
                      </Field>
                    </div>
                  </div>
                )}
              />
            </Card>
          </TabsContent>

          <TabsContent value="contact-page" className="mt-6">
            <Card>
              <p className="text-xs text-muted-foreground">Content for the /contact page.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.contactPage.heading}
                    onChange={(e) => updateContactPage({ heading: e.target.value })}
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.contactPage.subheading}
                    onChange={(e) => updateContactPage({ subheading: e.target.value })}
                  />
                </Field>
                <Field label="Email">
                  <Input value={content.contactPage.email} onChange={(e) => updateContactPage({ email: e.target.value })} />
                </Field>
                <Field label="Phone">
                  <Input value={content.contactPage.phone} onChange={(e) => updateContactPage({ phone: e.target.value })} />
                </Field>
                <Field label="Address">
                  <Input
                    value={content.contactPage.address}
                    onChange={(e) => updateContactPage({ address: e.target.value })}
                  />
                </Field>
                <Field label="Hours">
                  <Input value={content.contactPage.hours} onChange={(e) => updateContactPage({ hours: e.target.value })} />
                </Field>
                <Field label="Form Heading">
                  <Input
                    value={content.contactPage.formHeading}
                    onChange={(e) => updateContactPage({ formHeading: e.target.value })}
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services-page" className="mt-6">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /services page. The service list itself is managed in the
                Services tab.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.servicesPage.heading}
                    onChange={(e) => updateServicesPage({ heading: e.target.value })}
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.servicesPage.subheading}
                    onChange={(e) => updateServicesPage({ subheading: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Intro Text">
                <Textarea
                  value={content.servicesPage.intro}
                  onChange={(e) => updateServicesPage({ intro: e.target.value })}
                  className="min-h-16 resize-none"
                />
              </Field>
            </Card>
          </TabsContent>

          <TabsContent value="find-labour-page" className="mt-6">
            <Card>
              <p className="text-xs text-muted-foreground">
                Content for the /find-labour page. The worker list itself is managed in the
                Workers tab.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <Input
                    value={content.findLabourPage.heading}
                    onChange={(e) => updateFindLabourPage({ heading: e.target.value })}
                  />
                </Field>
                <Field label="Subheading">
                  <Input
                    value={content.findLabourPage.subheading}
                    onChange={(e) => updateFindLabourPage({ subheading: e.target.value })}
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <RequestsPanel />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <MessagesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6 shadow-xs">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-2 border-t border-border pt-5 text-sm font-semibold text-foreground">
      {children}
    </h3>
  );
}

function TagListEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1 rounded-md border border-border py-1 pr-1 pl-2.5">
            <input
              value={item}
              onChange={(e) =>
                onChange(items.map((it, i) => (i === index ? e.target.value : it)))
              }
              className="w-24 bg-transparent text-sm outline-none"
            />
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              className="text-destructive"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => onChange([...items, "New City"])}
      >
        Add city
      </Button>
    </div>
  );
}

function RequestsPanel() {
  const [requests, setRequests] = useState<LabourRequestDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/requests")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load requests");
        return res.json();
      })
      .then(setRequests)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load requests"));
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/requests/${id}`, { method: "DELETE" });
      setRequests((prev) => prev?.filter((r) => r.id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card>
      <p className="text-xs text-muted-foreground">
        Labour requests submitted through the &quot;Request Labour&quot; form.
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && requests === null && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}
      {requests?.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No requests yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {requests?.map((req) => (
          <div key={req.id} className="flex items-start gap-3 rounded-lg border border-border p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <ClipboardList className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-blue-950 dark:text-white">{req.name}</p>
                <span className="text-xs text-muted-foreground">{req.phone}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(req.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground">Service:</strong> {req.service}
                </span>
                <span>
                  <strong className="text-foreground">Location:</strong> {req.location}
                </span>
                {req.date && (
                  <span>
                    <strong className="text-foreground">Date:</strong> {req.date}
                  </span>
                )}
              </div>
              {req.details && <p className="mt-1 text-sm text-foreground">{req.details}</p>}
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              className="shrink-0 text-destructive"
              onClick={() => handleDelete(req.id)}
              disabled={deletingId === req.id}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState<ContactMessageDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load messages");
        return res.json();
      })
      .then(setMessages)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load messages"));
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev?.filter((m) => m.id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card>
      <p className="text-xs text-muted-foreground">
        Messages submitted through the /contact page form.
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && messages === null && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}
      {messages?.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No messages yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {messages?.map((msg) => (
          <div key={msg.id} className="flex items-start gap-3 rounded-lg border border-border p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <Mail className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-blue-950 dark:text-white">{msg.name}</p>
                <span className="text-xs text-muted-foreground">{msg.contact}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground">{msg.message}</p>
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              className="shrink-0 text-destructive"
              onClick={() => handleDelete(msg.id)}
              disabled={deletingId === msg.id}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
