import { useEffect, useRef, useState } from 'react';
import { MapPinIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Leaflet được load qua CDN trong index.html → window.L
// Không import từ npm để tránh lỗi khi disk đầy

const reverseGeocode = async (lat, lng) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { 'Accept-Language': 'vi' } }
        );
        const data = await res.json();
        if (!data?.address) return data?.display_name || null;
        const a = data.address;
        const parts = [
            a.house_number,
            a.road || a.pedestrian || a.footway,
            a.suburb || a.neighbourhood,
            a.city_district || a.district,
            a.city || a.town || a.village || a.county,
            a.state,
        ].filter(Boolean);
        return parts.join(', ') || data.display_name;
    } catch { return null; }
};

const searchGeocode = async (query) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=vn`,
            { headers: { 'Accept-Language': 'vi' } }
        );
        return await res.json();
    } catch { return []; }
};

const AddressMapPicker = ({ onAddressSelect, initialAddress = '' }) => {
    const containerRef    = useRef(null);
    const mapRef          = useRef(null);
    const markerRef       = useRef(null);
    const searchTimer     = useRef(null);

    const [searchQuery,     setSearchQuery]     = useState(initialAddress);
    const [searchResults,   setSearchResults]   = useState([]);
    const [searching,       setSearching]       = useState(false);
    const [loadingAddr,     setLoadingAddr]     = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [mapReady,        setMapReady]        = useState(false);

    // Khởi tạo bản đồ sau khi component mount
    useEffect(() => {
        if (mapRef.current || !containerRef.current) return;

        const waitForLeaflet = () => {
            if (!window.L) { setTimeout(waitForLeaflet, 100); return; }
            const L = window.L;

            // Fix icon
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            const map = L.map(containerRef.current, {
                center: [10.7769, 106.7009],
                zoom: 13,
                zoomControl: true,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            map.on('click', async (e) => {
                const { lat, lng } = e.latlng;
                placeMarker(lat, lng);
                setLoadingAddr(true);
                const addr = await reverseGeocode(lat, lng);
                setLoadingAddr(false);
                if (addr) {
                    setSelectedAddress(addr);
                    setSearchQuery(addr);
                    setSearchResults([]);
                    onAddressSelect(addr, lat, lng);
                }
            });

            mapRef.current = map;
            setMapReady(true);
        };

        waitForLeaflet();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const placeMarker = (lat, lng) => {
        const L = window.L;
        if (!L || !mapRef.current) return;
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
        mapRef.current.setView([lat, lng], Math.max(mapRef.current.getZoom(), 15));
    };

    const handleLocateMe = () => {
        if (!navigator.geolocation) { alert('Trình duyệt không hỗ trợ GPS'); return; }
        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                const { latitude: lat, longitude: lng } = coords;
                placeMarker(lat, lng);
                setLoadingAddr(true);
                const addr = await reverseGeocode(lat, lng);
                setLoadingAddr(false);
                if (addr) {
                    setSelectedAddress(addr);
                    setSearchQuery(addr);
                    onAddressSelect(addr, lat, lng);
                }
            },
            () => alert('Không thể lấy vị trí. Vui lòng cho phép truy cập vị trí.')
        );
    };

    const handleSearchChange = (e) => {
        const q = e.target.value;
        setSearchQuery(q);
        setSearchResults([]);
        if (searchTimer.current) clearTimeout(searchTimer.current);
        if (q.length < 3) return;
        searchTimer.current = setTimeout(async () => {
            setSearching(true);
            const results = await searchGeocode(q);
            setSearchResults(results);
            setSearching(false);
        }, 600);
    };

    const handleSelectResult = (r) => {
        const lat = parseFloat(r.lat);
        const lng = parseFloat(r.lon);
        placeMarker(lat, lng);
        setSelectedAddress(r.display_name);
        setSearchQuery(r.display_name);
        setSearchResults([]);
        onAddressSelect(r.display_name, lat, lng);
    };

    return (
        <div className="space-y-3">
            {/* Search + Locate */}
            <div className="relative">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Tìm địa chỉ trên bản đồ..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        />
                        {searching && (
                            <ArrowPathIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 animate-spin" />
                        )}
                    </div>
                    <button type="button" onClick={handleLocateMe}
                        className="flex-shrink-0 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-1.5 text-sm font-medium whitespace-nowrap">
                        <MapPinIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Vị trí của tôi</span>
                    </button>
                </div>

                {/* Dropdown */}
                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-[9999] mt-1 bg-white rounded-xl shadow-xl border border-slate-100 max-h-52 overflow-y-auto">
                        {searchResults.map((r, i) => (
                            <button key={i} type="button" onClick={() => handleSelectResult(r)}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 flex items-start gap-2 border-b border-slate-50 last:border-0">
                                <MapPinIcon className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{r.display_name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map container */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ zIndex: 0 }}>
                <div
                    ref={containerRef}
                    style={{ height: '300px', width: '100%' }}
                />
                {/* Loading overlay */}
                {loadingAddr && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center" style={{ zIndex: 9999 }}>
                        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-lg text-sm text-slate-700">
                            <ArrowPathIcon className="h-4 w-4 animate-spin text-blue-500" />
                            Đang lấy địa chỉ...
                        </div>
                    </div>
                )}
            </div>

            {/* Selected address */}
            {selectedAddress ? (
                <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm">
                    <MapPinIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-semibold text-green-700 mb-0.5">✅ Địa chỉ đã chọn:</p>
                        <p className="text-green-800">{selectedAddress}</p>
                    </div>
                </div>
            ) : (
                <p className="text-xs text-slate-400 text-center py-1">
                    📍 Nhấp vào bản đồ hoặc tìm kiếm để tự động điền địa chỉ
                </p>
            )}
        </div>
    );
};

export default AddressMapPicker;
