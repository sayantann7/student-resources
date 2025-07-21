'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Resource {
  "Program Name": string;
  "Program Value": string;
  "Tags": string[];
  "Description": string;
  "Program Company Icon"?: string;
  "Apply Link": string;
}

interface ResourceData {
  tools_and_software: Resource[];
  certifications_and_courses: Resource[];
  scholarships_and_fellowships: Resource[];
  internships_and_mentorship: Resource[];
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceData | null>(null);
  const [activeCategory, setActiveCategory] = useState('tools_and_software');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/resources.json')
      .then(response => response.json())
      .then(data => setResources(data))
      .catch(error => console.error('Error loading resources:', error));
  }, []);

  const categories = [
    { key: 'tools_and_software', label: 'Tools & Software', icon: '🛠️' },
    { key: 'certifications_and_courses', label: 'Certifications & Courses', icon: '🎓' },
    { key: 'scholarships_and_fellowships', label: 'Scholarships & Fellowships', icon: '💰' },
    { key: 'internships_and_mentorship', label: 'Internships & Mentorship', icon: '🚀' }
  ];

  const filteredResources = resources && resources[activeCategory as keyof ResourceData]
    ? resources[activeCategory as keyof ResourceData].filter(resource => 
        resource["Program Name"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.Tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Sidebar - Fixed Left */}
      <motion.div 
        className="hidden md:block fixed left-4 top-[47vh] transform -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Glassmorphism container */}
        <div 
          className="rounded-xl p-3 w-18 transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 12px 28px rgba(0, 0, 0, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1),
              inset 0 0 3px 2px rgba(255, 255, 255, 0.1)
            `
          }}
        >
                    {/* Category Navigation */}
          <div className="space-y-2">
            {categories.map((category, index) => {
              // Custom widths for each category's popout
              const getHoverWidth = (key: string) => {
                switch (key) {
                  case 'tools_and_software': return 'hover:w-46'; // "Tools & Software" - shorter
                  case 'certifications_and_courses': return 'hover:w-60'; // "Certifications & Courses" - medium
                  case 'scholarships_and_fellowships': return 'hover:w-65'; // "Scholarships & Fellowships" - longer
                  case 'internships_and_mentorship': return 'hover:w-60'; // "Internships & Mentorship" - medium
                  default: return 'hover:w-56';
                }
              };

              return (
                <motion.button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`group relative w-12 h-12 rounded-xl transition-all duration-300 ease-out ${getHoverWidth(category.key)} hover:pr-4 flex items-center overflow-hidden backdrop-blur-lg ${
                    activeCategory === category.key
                      ? 'bg-white/80 border border-white/50 shadow-lg text-black'
                      : 'bg-white/50 border border-white/20 hover:bg-white/100 hover:border-white/40 text-black'
                  }`}
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: activeCategory === category.key 
                      ? '1px solid rgba(255, 255, 255, 0.6)' 
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: activeCategory === category.key 
                      ? `
                        0 8px 32px rgba(0, 0, 0, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 0 6px 3px rgba(255, 255, 255, 0.4)
                      `
                      : `
                        0 4px 12px rgba(0, 0, 0, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 0 2px 1px rgba(255, 255, 255, 0.15)
                      `
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (0.1 * index) }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center pl-3">
                    <span className="text-lg min-w-[24px] text-center">{category.icon}</span>
                    <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {category.label}
                    </span>
                  </div>
                  {/* Glassmorphism highlight lines */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: activeCategory === category.key 
                        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                    }}
                  />
                  <div 
                    className="absolute top-0 left-0 w-px h-full"
                    style={{
                      background: activeCategory === category.key 
                        ? 'linear-gradient(180deg, rgba(255, 255, 255, 1), transparent, rgba(255, 255, 255, 0.5))'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent, rgba(255, 255, 255, 0.2))'
                    }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar - Fixed Bottom */}
      <motion.div 
        className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 pb-safe bg-gradient-to-t from-black/20 to-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ height: 'calc(env(safe-area-inset-bottom) + 80px)' }}
      >
        <div className="flex justify-center">
          {/* Glassmorphism container */}
          <div 
            className="rounded-xl p-2 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 12px 28px rgba(0, 0, 0, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                inset 0 0 3px 2px rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Category Navigation - Horizontal layout for mobile */}
            <div className="flex space-x-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`relative w-12 h-12 rounded-xl transition-all duration-300 ease-out flex items-center justify-center backdrop-blur-lg ${
                    activeCategory === category.key
                      ? 'bg-white/80 border border-white/50 shadow-lg text-black'
                      : 'bg-white/50 border border-white/20 hover:bg-white/100 hover:border-white/40 text-black'
                  }`}
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: activeCategory === category.key 
                      ? '1px solid rgba(255, 255, 255, 0.6)' 
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: activeCategory === category.key 
                      ? `
                        0 8px 32px rgba(0, 0, 0, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 0 6px 3px rgba(255, 255, 255, 0.4)
                      `
                      : `
                        0 4px 12px rgba(0, 0, 0, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 0 2px 1px rgba(255, 255, 255, 0.15)
                      `
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (0.1 * index) }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{category.icon}</span>
                  
                  {/* Glassmorphism highlight lines */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: activeCategory === category.key 
                        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                    }}
                  />
                  <div 
                    className="absolute top-0 left-0 w-px h-full"
                    style={{
                      background: activeCategory === category.key 
                        ? 'linear-gradient(180deg, rgba(255, 255, 255, 1), transparent, rgba(255, 255, 255, 0.5))'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent, rgba(255, 255, 255, 0.2))'
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area - responsive margin */}
      <div className="md:ml-20 ml-0 mb-20 md:mb-0">
        {/* Header Section */}
        <motion.div 
          className="py-20 px-4 pb-8 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 
                className="text-5xl md:text-6xl mb-6 text-gray-900"
                style={{ fontFamily: 'The Seasons, serif', fontWeight: 700 }}
              >
                Explore Resources
              </h1>
              <p 
                className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Discover 100+ of free tools, courses, and opportunities designed specifically for students
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div 
          className="py-20 pt-0 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 bg-white shadow-md"
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  🔍
                </div>
              </div>
            </motion.div>

            {/* Resources Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:border-gray-300 group bg-white shadow-lg hover:shadow-xl flex flex-col h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * (index % 9) }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.15 } }}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Program Icon */}
                    {resource["Program Company Icon"] && (
                      <div className="mb-4">
                        <img 
                          src={resource["Program Company Icon"]} 
                          alt={resource["Program Name"]}
                          className="w-12 h-12 object-contain rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Program Name */}
                    <h3 
                      className="text-xl font-semibold text-gray-900 mb-2"
                      style={{ fontFamily: 'Helvetica, serif', fontWeight: 700 }}
                    >
                      {resource["Program Name"]}
                    </h3>

                    {/* Program Value */}
                    <div className="mb-3">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium relative overflow-hidden text-gray-700"
                        style={{ 
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: `
                            0 4px 16px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                            inset 0 0 2px 1px rgba(255, 255, 255, 0.2)
                          `
                        }}
                      >
                        {resource["Program Value"]}
                        <div 
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
                          }}
                        />
                        <div 
                          className="absolute top-0 left-0 w-px h-full"
                          style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
                          }}
                        />
                      </span>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow"
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    >
                      {resource.Description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource.Tags?.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 rounded-full text-xs relative overflow-hidden text-gray-600"
                          style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: `
                              0 2px 8px rgba(0, 0, 0, 0.1),
                              inset 0 1px 0 rgba(255, 255, 255, 0.5),
                              inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                              inset 0 0 2px 1px rgba(255, 255, 255, 0.2)
                            `
                          }}
                        >
                          {tag}
                          <div 
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
                            }}
                          />
                        </span>
                      ))}
                      {resource.Tags?.length > 3 && (
                        <span 
                          className="px-2 py-1 rounded-full text-xs relative overflow-hidden text-gray-600"
                          style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: `
                              0 2px 8px rgba(0, 0, 0, 0.1),
                              inset 0 1px 0 rgba(255, 255, 255, 0.5),
                              inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                              inset 0 0 2px 1px rgba(255, 255, 255, 0.2)
                            `
                          }}
                        >
                          +{resource.Tags.length - 3} more
                          <div 
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
                            }}
                          />
                        </span>
                      )}
                    </div>

                    {/* Apply Link */}
                    <div className="mt-auto">
                      <motion.a
                        href={resource["Apply Link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden text-gray-700 w-full justify-center"
                        style={{
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: `
                            0 8px 32px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                            inset 0 0 4px 2px rgba(255, 255, 255, 0.2)
                          `
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Claim Now
                        <div 
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
                          }}
                        />
                        <div 
                          className="absolute top-0 left-0 w-px h-full"
                          style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
                          }}
                        />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Loading State */}
            {!resources && (
              <motion.div 
                className="flex justify-center items-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-gray-700 text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Loading resources...
                </div>
              </motion.div>
            )}

            {/* No Results */}
            {resources && filteredResources.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  No resources found matching your search.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
