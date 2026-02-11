"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  DollarSign,
  Briefcase,
  BarChart,
  Plus,
  Clock,
} from "lucide-react";
import { Talent } from "@/shared/types";

interface TalentDashboardProps {
  user: any;
  talentProfile: Talent | null;
  updateTalentMutation: any;
}

export default function TalentDashboard({
  user,
  talentProfile,
  updateTalentMutation,
}: TalentDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: talentProfile?.title || "",
    category: talentProfile?.category || "developer",
    bio: talentProfile?.bio || "",
    hourly_rate: Number(talentProfile?.hourly_rate) || 0,
    experience_years: Number(talentProfile?.experience_years) || 0,
    skills: talentProfile?.skills || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (talentProfile?.id) {
      updateTalentMutation.mutate({
        id: talentProfile.id,
        data: formData as any,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] sm:text-2xl font-bold text-[#1a1a2e]">
          Profile Overview
        </h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "ghost" : "outline"}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-500 text-sm font-medium uppercase">
              Earnings
            </h3>
          </div>
          <div className="mt-2 text-3xl font-bold text-[#1a1a2e]">
            ${(talentProfile?.completed_projects || 0) * 1200}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Estimates based on projects
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-[#204ecf]" />
            </div>
            <h3 className="text-xs sm:text-sm font-medium uppercase text-gray-500">
              Projects
            </h3>
          </div>
          <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
            {talentProfile?.completed_projects || 0}
          </div>
          <p className="text-xs text-gray-400 mt-1">Completed assignments</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <BarChart className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <h3 className="text-xs sm:text-sm font-medium uppercase text-gray-500">
              Rating
            </h3>
          </div>
          <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
            {talentProfile?.rating || "5.0"}
          </div>
          <p className="text-xs text-yellow-600 mt-1">Excellent performance</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="text-xs sm:text-sm font-medium uppercase text-gray-500">
              Applications
            </h3>
          </div>
          <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#1a1a2e]">12</div>
          <p className="text-xs text-gray-400 mt-1">Active bids</p>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-4xl">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
            Edit Professional Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2  text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#204ecf] outline-none"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#204ecf] outline-none bg-white font-medium"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as any,
                    })
                  }
                >
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="product_manager">Product Manager</option>
                  <option value="project_manager">Project Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#204ecf] outline-none"
                  value={formData.hourly_rate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hourly_rate: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#204ecf] outline-none"
                  value={formData.experience_years}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experience_years: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Skills (comma separated)
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#204ecf] outline-none"
                value={formData.skills.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s !== ""),
                  })
                }
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-bold text-gray-700 mb-2">
                Professional Bio
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#204ecf] outline-none resize-none"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={updateTalentMutation.isPending}
                className="px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateTalentMutation.isPending}
                className="bg-[#204ecf] text-white hover:bg-[#1a3da8] px-8"
              >
                {updateTalentMutation.isPending
                  ? "Saving..."
                  : "Save Profile"}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start sm:items-center gap-6 mb-8">
              <img
                src={
                  user?.avatar_url ||
                  `https://ui-avatars.com/api/?name=${user?.full_name}&background=random`
                }
                alt={user?.full_name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-50"
              />
              <div>
                <h2 className="text-[20px] max-sm:leading-[20px] sm:text-2xl font-bold text-[#1a1a2e]">
                  {user?.full_name}
                </h2>
                <p className="text-[#204ecf] font-semibold mt-2">
                  {talentProfile?.title || "Professional Talent"}
                </p>
                <div className="flex  items-center gap-4 mt-4 sm:mt-2 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> $
                    {talentProfile?.hourly_rate || 0}/hr
                  </span>
                  <span className="flex items-center gap-1 text-nowrap">
                    <Briefcase className="w-4 h-4" />{" "}
                    {talentProfile?.experience_years || 0} Years Exp
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  About Me
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {talentProfile?.bio ||
                    "No bio provided yet. Update your profile to tell clients about yourself."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {talentProfile?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-[#204ecf] rounded-lg text-sm font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                  {(!talentProfile?.skills ||
                    talentProfile.skills.length === 0) && (
                    <span className="text-gray-400 text-sm">
                      No skills added yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity / Sidebar */}
          <div className="space-y-4">
            <div className="bg-white h-48 p-6  rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-[#1a1a2e] mb-8">Availability</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-gray-700">
                  Currently Available
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Open to new projects and contracts
              </p>
            </div>

            <div className="bg-[#1a1a2e] h-48 p-6 rounded-2xl text-white">
              <h3 className="font-bold mb-3">Upgrade to Pro</h3>
              <p className="text-sm text-gray-400 mb-4 font-medium">
                Get featured placements and direct client matchmaking.
              </p>
              <Button className="w-full bg-[#00c853] hover:bg-[#00a846] text-white border-none">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
