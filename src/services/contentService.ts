import { supabase, isSupabaseConfigured } from './supabase';
import {
  Project,
  Certification,
  Experiment,
  Skill,
  Milestone,
  Profile,
  SiteSettings,
  MediaItem
} from '../types/content';
import {
  initialProjects,
  initialCertifications,
  initialExperiments,
  initialSkills,
  initialMilestones,
  initialProfile,
  initialSiteSettings,
  initialMediaItems
} from '../data/seedData';

// Local storage keys for local development persistence
const STORAGE_PREFIX = 'portfolio_vasudev_';
const KEYS = {
  PROJECTS: `${STORAGE_PREFIX}projects`,
  CERTS: `${STORAGE_PREFIX}certs`,
  EXPERIMENTS: `${STORAGE_PREFIX}experiments`,
  SKILLS: `${STORAGE_PREFIX}skills`,
  MILESTONES: `${STORAGE_PREFIX}milestones`,
  PROFILE: `${STORAGE_PREFIX}profile`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  MEDIA: `${STORAGE_PREFIX}media`,
  LOCAL_SESSION: `${STORAGE_PREFIX}admin_session`
};

// Helper to get from local storage or fallback to seed
function getLocalStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading local storage key ${key}:`, err);
    return fallback;
  }
}

function setLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving to local storage key ${key}:`, err);
  }
}

export class ContentService {
  // Public-facing data fetching (strictly published records only)
  static async getPublicProjects(): Promise<Project[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          return data as Project[];
        }
      } catch (err) {
        console.warn('Supabase query failed, falling back to bundled data:', err);
      }
    }
    const all = getLocalStorage<Project[]>(KEYS.PROJECTS, initialProjects);
    return all.filter(p => p.status === 'published' && p.id !== 'proj-veda').sort((a, b) => a.orderIndex - b.orderIndex);
  }

  static async getPublicCertifications(): Promise<Certification[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .eq('status', 'published')
          .order('issue_date', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as Certification[];
        }
      } catch (err) {
        console.warn('Supabase certs query failed, falling back:', err);
      }
    }
    const all = getLocalStorage<Certification[]>(KEYS.CERTS, initialCertifications);
    return all.filter(c => c.status === 'published');
  }

  static async getPublicExperiments(): Promise<Experiment[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('experiments')
          .select('*')
          .eq('status', 'published')
          .order('date', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as Experiment[];
        }
      } catch (err) {
        console.warn('Supabase experiments query failed, falling back:', err);
      }
    }
    const all = getLocalStorage<Experiment[]>(KEYS.EXPERIMENTS, initialExperiments);
    return all.filter(e => e.status === 'published');
  }

  static async getPublicSkills(): Promise<Skill[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          return data as Skill[];
        }
      } catch (err) {
        console.warn('Supabase skills query failed, falling back:', err);
      }
    }
    const all = getLocalStorage<Skill[]>(KEYS.SKILLS, initialSkills);
    return all.sort((a, b) => a.orderIndex - b.orderIndex);
  }

  static async getPublicMilestones(): Promise<Milestone[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('milestones')
          .select('*')
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          return data as Milestone[];
        }
      } catch (err) {
        console.warn('Supabase milestones query failed, falling back:', err);
      }
    }
    const all = getLocalStorage<Milestone[]>(KEYS.MILESTONES, initialMilestones);
    return all.sort((a, b) => a.orderIndex - b.orderIndex);
  }

  static async getProfile(): Promise<Profile> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .single();

        if (!error && data) {
          return data as Profile;
        }
      } catch (err) {
        console.warn('Supabase profile query failed, falling back:', err);
      }
    }
    return getLocalStorage<Profile>(KEYS.PROFILE, initialProfile);
  }

  static async getSiteSettings(): Promise<SiteSettings> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (!error && data) {
          return data as SiteSettings;
        }
      } catch (err) {
        console.warn('Supabase site settings query failed, falling back:', err);
      }
    }
    return getLocalStorage<SiteSettings>(KEYS.SETTINGS, initialSiteSettings);
  }

  // --- Admin Portfolio Studio (includes drafts, archived, and management operations) ---

  static async getAllProjectsAdmin(): Promise<Project[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true });

        if (!error && data) return data as Project[];
      } catch (err) {
        console.warn('Supabase admin projects fetch failed:', err);
      }
    }
    return getLocalStorage<Project[]>(KEYS.PROJECTS, initialProjects).filter(p => p.id !== 'proj-veda');
  }

  static async saveProject(project: Project): Promise<{ success: boolean; error?: string }> {
    project.updatedAt = new Date().toISOString();
    if (!project.id) {
      project.id = `proj-${Date.now()}`;
      project.createdAt = new Date().toISOString();
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('projects')
          .upsert(project);

        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    // Update local store as well
    const all = getLocalStorage<Project[]>(KEYS.PROJECTS, initialProjects);
    const index = all.findIndex(p => p.id === project.id);
    if (index >= 0) {
      all[index] = project;
    } else {
      all.push(project);
    }
    setLocalStorage(KEYS.PROJECTS, all);
    return { success: true };
  }

  static async deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Project[]>(KEYS.PROJECTS, initialProjects);
    const updated = all.filter(p => p.id !== id);
    setLocalStorage(KEYS.PROJECTS, updated);
    return { success: true };
  }

  // Certifications CRUD
  static async getAllCertificationsAdmin(): Promise<Certification[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('issue_date', { ascending: false });

        if (!error && data) return data as Certification[];
      } catch (err) {
        console.warn('Supabase admin certs fetch failed:', err);
      }
    }
    return getLocalStorage<Certification[]>(KEYS.CERTS, initialCertifications);
  }

  static async saveCertification(cert: Certification): Promise<{ success: boolean; error?: string }> {
    if (!cert.id) cert.id = `cert-${Date.now()}`;

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('certifications').upsert(cert);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Certification[]>(KEYS.CERTS, initialCertifications);
    const idx = all.findIndex(c => c.id === cert.id);
    if (idx >= 0) all[idx] = cert;
    else all.push(cert);
    setLocalStorage(KEYS.CERTS, all);
    return { success: true };
  }

  static async deleteCertification(id: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('certifications').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Certification[]>(KEYS.CERTS, initialCertifications);
    setLocalStorage(KEYS.CERTS, all.filter(c => c.id !== id));
    return { success: true };
  }

  // Experiments CRUD
  static async getAllExperimentsAdmin(): Promise<Experiment[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('experiments')
          .select('*')
          .order('date', { ascending: false });

        if (!error && data) return data as Experiment[];
      } catch (err) {
        console.warn('Supabase admin experiments fetch failed:', err);
      }
    }
    return getLocalStorage<Experiment[]>(KEYS.EXPERIMENTS, initialExperiments);
  }

  static async saveExperiment(exp: Experiment): Promise<{ success: boolean; error?: string }> {
    if (!exp.id) exp.id = `exp-${Date.now()}`;

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('experiments').upsert(exp);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Experiment[]>(KEYS.EXPERIMENTS, initialExperiments);
    const idx = all.findIndex(e => e.id === exp.id);
    if (idx >= 0) all[idx] = exp;
    else all.push(exp);
    setLocalStorage(KEYS.EXPERIMENTS, all);
    return { success: true };
  }

  static async deleteExperiment(id: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('experiments').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Experiment[]>(KEYS.EXPERIMENTS, initialExperiments);
    setLocalStorage(KEYS.EXPERIMENTS, all.filter(e => e.id !== id));
    return { success: true };
  }

  // Skills CRUD
  static async getAllSkillsAdmin(): Promise<Skill[]> {
    return this.getPublicSkills();
  }

  static async saveSkill(skill: Skill): Promise<{ success: boolean; error?: string }> {
    if (!skill.id) skill.id = `sk-${Date.now()}`;

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('skills').upsert(skill);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Skill[]>(KEYS.SKILLS, initialSkills);
    const idx = all.findIndex(s => s.id === skill.id);
    if (idx >= 0) all[idx] = skill;
    else all.push(skill);
    setLocalStorage(KEYS.SKILLS, all);
    return { success: true };
  }

  static async deleteSkill(id: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Skill[]>(KEYS.SKILLS, initialSkills);
    setLocalStorage(KEYS.SKILLS, all.filter(s => s.id !== id));
    return { success: true };
  }

  // Milestones CRUD
  static async getAllMilestonesAdmin(): Promise<Milestone[]> {
    return this.getPublicMilestones();
  }

  static async saveMilestone(ms: Milestone): Promise<{ success: boolean; error?: string }> {
    if (!ms.id) ms.id = `ms-${Date.now()}`;

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('milestones').upsert(ms);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Milestone[]>(KEYS.MILESTONES, initialMilestones);
    const idx = all.findIndex(m => m.id === ms.id);
    if (idx >= 0) all[idx] = ms;
    else all.push(ms);
    setLocalStorage(KEYS.MILESTONES, all);
    return { success: true };
  }

  static async deleteMilestone(id: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('milestones').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const all = getLocalStorage<Milestone[]>(KEYS.MILESTONES, initialMilestones);
    setLocalStorage(KEYS.MILESTONES, all.filter(m => m.id !== id));
    return { success: true };
  }

  // Profile Save
  static async saveProfile(profile: Profile): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('profile').upsert({ id: 'main', ...profile });
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
    setLocalStorage(KEYS.PROFILE, profile);
    return { success: true };
  }

  // Settings Save
  static async saveSiteSettings(settings: SiteSettings): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('site_settings').upsert({ id: 'main', ...settings });
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
    setLocalStorage(KEYS.SETTINGS, settings);
    return { success: true };
  }

  // Media Library
  static async getAllMedia(): Promise<MediaItem[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('media_items')
          .select('*')
          .order('uploaded_at', { ascending: false });

        if (!error && data) return data as MediaItem[];
      } catch (err) {
        console.warn('Supabase media fetch failed:', err);
      }
    }
    return getLocalStorage<MediaItem[]>(KEYS.MEDIA, initialMediaItems);
  }

  static async uploadMedia(file: File, category: MediaItem['category'], altText: string): Promise<{ success: boolean; item?: MediaItem; error?: string }> {
    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    const validDocTypes = ['application/pdf'];
    const isImage = validImageTypes.includes(file.type);
    const isPdf = validDocTypes.includes(file.type);

    if (!isImage && !isPdf) {
      return { success: false, error: 'Only JPG, PNG, WEBP, SVG images and PDF documents are allowed.' };
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      return { success: false, error: 'File size must not exceed 15MB.' };
    }

    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${category}/${timestamp}_${cleanName}`;

    let publicUrl = '';

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('portfolio-media')
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) return { success: false, error: uploadError.message };

        const { data: urlData } = supabase.storage
          .from('portfolio-media')
          .getPublicUrl(storagePath);

        publicUrl = urlData.publicUrl;
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    } else {
      // Local/Offline file handling: downscale large images to avoid localStorage quota issues
      if (isImage && file.type !== 'image/svg+xml') {
        publicUrl = await new Promise<string>((resolve) => {
          const img = new window.Image();
          const reader = new FileReader();
          reader.onload = (e) => {
            img.src = e.target?.result as string;
            img.onload = () => {
              const maxDim = 1600;
              let w = img.width;
              let h = img.height;
              if (w > maxDim || h > maxDim) {
                if (w > h) {
                  h = Math.round((h * maxDim) / w);
                  w = maxDim;
                } else {
                  w = Math.round((w * maxDim) / h);
                  h = maxDim;
                }
              }
              const canvas = document.createElement('canvas');
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, w, h);
              resolve(canvas.toDataURL('image/jpeg', 0.85));
            };
            img.onerror = () => resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      } else {
        publicUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      }
    }

    const newItem: MediaItem = {
      id: `med-${timestamp}`,
      fileName: file.name,
      fileUrl: publicUrl,
      fileType: isPdf ? 'pdf' : 'image',
      fileSize: file.size,
      altText: altText || file.name,
      category,
      uploadedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      await supabase.from('media_items').insert(newItem);
    }

    const all = getLocalStorage<MediaItem[]>(KEYS.MEDIA, initialMediaItems);
    all.unshift(newItem);
    setLocalStorage(KEYS.MEDIA, all);

    return { success: true, item: newItem };
  }

  static async deleteMedia(id: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('media_items').delete().eq('id', id);
      } catch (err: any) {
        console.warn('Error deleting media from supabase:', err);
      }
    }
    const all = getLocalStorage<MediaItem[]>(KEYS.MEDIA, initialMediaItems);
    setLocalStorage(KEYS.MEDIA, all.filter(m => m.id !== id));
    return { success: true };
  }

  // Backup & JSON Snapshot Export
  static exportCompleteSnapshot(): string {
    const payload = {
      exportedAt: new Date().toISOString(),
      owner: 'Vasudev Saras K M',
      profile: getLocalStorage(KEYS.PROFILE, initialProfile),
      siteSettings: getLocalStorage(KEYS.SETTINGS, initialSiteSettings),
      projects: getLocalStorage(KEYS.PROJECTS, initialProjects),
      certifications: getLocalStorage(KEYS.CERTS, initialCertifications),
      experiments: getLocalStorage(KEYS.EXPERIMENTS, initialExperiments),
      skills: getLocalStorage(KEYS.SKILLS, initialSkills),
      milestones: getLocalStorage(KEYS.MILESTONES, initialMilestones),
      media: getLocalStorage(KEYS.MEDIA, initialMediaItems)
    };
    return JSON.stringify(payload, null, 2);
  }

  static importCompleteSnapshot(jsonString: string): { success: boolean; error?: string } {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects) setLocalStorage(KEYS.PROJECTS, data.projects);
      if (data.certifications) setLocalStorage(KEYS.CERTS, data.certifications);
      if (data.experiments) setLocalStorage(KEYS.EXPERIMENTS, data.experiments);
      if (data.skills) setLocalStorage(KEYS.SKILLS, data.skills);
      if (data.milestones) setLocalStorage(KEYS.MILESTONES, data.milestones);
      if (data.profile) setLocalStorage(KEYS.PROFILE, data.profile);
      if (data.siteSettings) setLocalStorage(KEYS.SETTINGS, data.siteSettings);
      if (data.media) setLocalStorage(KEYS.MEDIA, data.media);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Invalid JSON snapshot file' };
    }
  }

  // Reset to Factory Default Seed Data
  static resetToDefaults(): void {
    setLocalStorage(KEYS.PROJECTS, initialProjects);
    setLocalStorage(KEYS.CERTS, initialCertifications);
    setLocalStorage(KEYS.EXPERIMENTS, initialExperiments);
    setLocalStorage(KEYS.SKILLS, initialSkills);
    setLocalStorage(KEYS.MILESTONES, initialMilestones);
    setLocalStorage(KEYS.PROFILE, initialProfile);
    setLocalStorage(KEYS.SETTINGS, initialSiteSettings);
    setLocalStorage(KEYS.MEDIA, initialMediaItems);
  }
}
