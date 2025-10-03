'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import type { QuoteRequest } from '@/types/index';

interface QuoteRequestsResponse {
  success: boolean;
  data: QuoteRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'NEW', label: 'New' },
  { value: 'REVIEWED', label: 'Reviewed' },
  { value: 'QUOTED', label: 'Quoted' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'DECLINED', label: 'Declined' },
  { value: 'CLOSED', label: 'Closed' }
];

const SERVICE_TYPE_OPTIONS = [
  { value: '', label: 'All Services' },
  { value: 'portrait', label: 'Portrait Photography' },
  { value: 'event', label: 'Event Photography' },
  { value: 'aerial', label: 'Aerial Photography' },
  { value: 'pet', label: 'Pet Photography' },
  { value: 'commercial', label: 'Commercial Photography' },
  { value: 'real-estate', label: 'Real Estate Photography' },
  { value: 'inspection', label: 'Property Inspection' }
];

export default function QuoteRequestsPage() {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    serviceType: '',
    page: 1
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchQuoteRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.serviceType) params.append('serviceType', filters.serviceType);
      params.append('page', filters.page.toString());

      const response = await fetch(`/api/quote-requests?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: QuoteRequestsResponse = await response.json();

      if (!result.success) {
        throw new Error('Failed to fetch quote requests');
      }

      setQuoteRequests(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchQuoteRequests();
  }, [fetchQuoteRequests, filters]);

  useEffect(() => {
    fetchQuoteRequests();
  }, [fetchQuoteRequests]);

  const handleFilterChange = useCallback((field: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      page: field !== 'page' ? 1 : (typeof value === 'number' ? value : parseInt(value.toString()))
    }));
  }, []);

  const getStatusBadgeColor = useCallback((status: string) => {
    const statusColors: Record<string, string> = {
      'NEW': 'bg-blue-100 text-blue-800',
      'REVIEWED': 'bg-yellow-100 text-yellow-800',
      'QUOTED': 'bg-purple-100 text-purple-800',
      'ACCEPTED': 'bg-green-100 text-green-800',
      'DECLINED': 'bg-red-100 text-red-800',
      'CLOSED': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  if (loading && quoteRequests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quote requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
          <p className="mt-2 text-gray-600">
            Manage and respond to photography service requests
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status"
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              options={STATUS_OPTIONS}
            />
            <Select
              label="Service Type"
              value={filters.serviceType}
              onChange={(value) => handleFilterChange('serviceType', value)}
              options={SERVICE_TYPE_OPTIONS}
            />
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setFilters({ status: '', serviceType: '', page: 1 })}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Quote requests list */}
        <div className="space-y-4">
          {quoteRequests.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No quote requests found.</p>
            </Card>
          ) : (
            quoteRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {request.email} {request.phone && `• ${request.phone}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(request.createdAt.toString())}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Service Type</p>
                    <p className="text-sm text-gray-900">{request.serviceType}</p>
                  </div>
                  {request.sessionType && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Session Type</p>
                      <p className="text-sm text-gray-900">{request.sessionType}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-sm text-gray-900">{request.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Timeline</p>
                    <p className="text-sm text-gray-900">{request.timeline}</p>
                  </div>
                  {request.budget && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Budget</p>
                      <p className="text-sm text-gray-900">{request.budget}</p>
                    </div>
                  )}
                  {request.preferredDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Preferred Date</p>
                      <p className="text-sm text-gray-900">
                        {new Date(request.preferredDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Project Description</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    {request.projectDescription}
                  </p>
                </div>

                {request.specialRequirements && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Special Requirements</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {request.specialRequirements}
                    </p>
                  </div>
                )}

                {request.petDetails && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Pet Details</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {request.petDetails}
                    </p>
                  </div>
                )}

                {request.adminNotes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Admin Notes</p>
                    <p className="text-sm text-gray-900 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                      {request.adminNotes}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    ID: {request.id}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${request.email}?subject=Re: Photography Quote Request`)}
                    >
                      Email Client
                    </Button>
                    {request.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${request.phone}`)}
                      >
                        Call Client
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} results
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => handleFilterChange('page', pagination.page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handleFilterChange('page', pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
