/**
 * Sources state which data the map should display. Specify the type of source
 * with the "type" property, which must be one of vector, raster, raster-dem,
 * geojson, image, video. Adding a source isn't enough to make data appear on
 * the map because sources don't contain styling details like color or width.
 * Layers refer to a source and give it a visual representation. This makes it
 * possible to style the same source in different ways, like differentiating
 * between types of roads in a highways layer.
 *
 * Tiled sources (vector and raster) must specify their details according to
 * the TileJSON specification. There are several ways to do so:
 *
 * - By supplying TileJSON properties such as "tiles", "minzoom", and "maxzoom"
 *   directly in the source
 * - By providing a "url" to a TileJSON resource
 * - By providing a URL to a WMS server that supports EPSG:3857 (or
 *   EPSG:900913) as a source of tiled data. The server URL should contain a
 *   "{bbox-epsg-3857}" replacement token to supply the bbox parameter.
 *
 * See: https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
 */

export default {
  /**
   * Raster Tilesets
   *
   * Usage example:
   * map.addSource('source-id', {
   *   type: 'raster',
   *   url: 'mapbox://tilesetid',
   *   tileSize: 256,
   * })
   */
  raster: [],
  /**
   * Vector Tilesets
   *
   * Usage example:
   * map.addSource('source-id', {
   *  type: 'vector',
   *  url: 'mapbox://tilesetid'
   * });
   */
  vector: [
    {
      id: 'sierra-leone-borders',
      layer: 'Sierra_Leone_Country_Border-cch16f',
      tilesetid: 'iandmuir.8whqk4of',
    },
    {
      id: 'sierra-leone-districts',
      layer: 'Sierra_Leone_Districts-c34k65',
      tilesetid: 'iandmuir.4f3biqz2',
    },
    {
      id: 'sierra-leone-transmission',
      layer: 'Sierra_Leone_Transmission_Lin-dyrefu',
      tilesetid: 'iandmuir.cv1a7jo6',
    },
    {
      id: 'sierra-leone-pharmacy',
      layer: 'Sierra_Leone_Pharmacies-cz5yed',
      tilesetid: 'iandmuir.5me2tui9',
    },
    {
      id: 'sierra-leone-schools',
      layer: 'Sierra_Leone_Schools-0nmwd3',
      tilesetid: 'iandmuir.az8kzkrs',
    },
    {
      id: 'sierra-leone-banks',
      layer: 'Sierra_Leone_Banks-0q3a0o',
      tilesetid: 'iandmuir.26ukns6c',
    },
  ],
  /**
   * GeoJSON Datasets
   *
   * Usage example:
   * map.addSource('source-id', {
   *  type: 'geojson',
   *  data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
   * });
   */
  geojson: [],
}
