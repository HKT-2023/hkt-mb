import React, { useRef } from 'react';
import {StyleSheet, View} from 'react-native';
import {ratioW} from '@app/utils/UDimension';
import MapBox from '@app/components/organism/Map/MapBox';
import { Camera } from '@rnmapbox/maps';

const MapViewRealEstate = ({coordinate}: {coordinate: number[][]}) => {
  const cameraRef = useRef<Camera>(null);
  return (
    <View style={styles.container}>
      <MapBox
        listCoordinates={coordinate ?? []}
        containerStyle={styles.map}
        largeMapView={false}
        mapCameraProps={{
          animationDuration: 500,
          centerCoordinate: coordinate[0],
          zoomLevel: 15,
        }}
        cameraRef={cameraRef}
      />
    </View>
  );
};

export default React.memo(MapViewRealEstate);

const styles = StyleSheet.create({
  container: {
    marginTop: ratioW(19),
    marginHorizontal: ratioW(19),
    overflow: 'hidden',
    borderRadius: ratioW(12),
  },
  map: {
    maxWidth: ratioW(376),
    height: ratioW(224),
  },
});
