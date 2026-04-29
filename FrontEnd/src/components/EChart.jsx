import { useEffect, useRef } from 'react';

/**
 * EChart – wrapper dùng window.echarts (load qua CDN trong index.html)
 * Props:
 *   option: ECharts option object
 *   style?: React style object (mặc định h-64)
 *   className?: string
 */
const EChart = ({ option, style, className = '' }) => {
    const containerRef = useRef(null);
    const chartRef     = useRef(null);

    useEffect(() => {
        const tryInit = () => {
            if (!window.echarts || !containerRef.current) {
                setTimeout(tryInit, 100);
                return;
            }
            if (chartRef.current) {
                chartRef.current.dispose();
            }
            const chart = window.echarts.init(containerRef.current, null, { renderer: 'svg' });
            chart.setOption(option);
            chartRef.current = chart;
        };
        tryInit();
        const handleResize = () => chartRef.current?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chartRef.current?.dispose();
            chartRef.current = null;
        };
    }, []);

    // Cập nhật option khi data thay đổi
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.setOption(option, true);
        }
    }, [option]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width: '100%', height: 240, ...style }}
        />
    );
};

export default EChart;
