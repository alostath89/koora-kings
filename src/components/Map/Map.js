/* global google */
/* global window */
/* global navigator */

import React, { Component } from 'react'
import { config } from 'utils'
import _ from 'lodash'
import { compose, withProps, lifecycle } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${config.mapApiKey}&language=en&v=3.exp&libraries=geometry,drawing,places,visualization`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: this.props.position || {
          lat: 24.7136,
          lng: 46.6753,
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref
          this.setState({
            center: this.props.position,
            position: this.props.position,
          })
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          const bounds = new google.maps.LatLngBounds()

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }))
          const nextCenter =
            _.get(nextMarkers, '0.position', this.state.center) || []

          let latLng = nextMarkers[0].position
          this.setState({
            center: nextCenter,
            position: { lat: latLng.lat(), lng: latLng.lng() },
          })
          this.props.onMapClick({ latLng })
        },
        onMapClick: e => {
          this.setState({
            center: e.latLng,
            position: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            },
          })
          this.props.onMapClick(e)
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onClick={props.onMapClick}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Select the location"
        defaultValue={props.address || ''}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.position && <Marker position={props.position} />}
  </GoogleMap>
))

export default Map
