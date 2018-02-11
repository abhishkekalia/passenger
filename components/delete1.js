      <View style={styles.container}>
          <View style={styles.innerTop} >
            

            <TextInput 
                style={styles.textbox}
                placeholder = "From Address"
                placeholderTextColor = '#000'
                autoCorrect = {false}
                onChangeText={(text) => this.setState({fromAddress: text})}
                value={this.state.fromAddress}
              />
              <TextInput 
                style={styles.textbox}
                placeholder = "To Address"
                placeholderTextColor = '#000'
                autoCorrect = {false}
                onChangeText={(text) => this.setState({toAddress: text})}
                value={this.state.toAddress}
              />
              <TouchableHighlight
                style={styles.signin}
                onPress={() => this.fetchDirections([LONGITUDE, LATITUDE], [-74.005350272247554, 40.704310079961523])} 
                underlayColor='#3B5999'>
                  <Text style={styles.signinText}>Find Route</Text>
              </TouchableHighlight>

            {/*<MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={15}
              showUserLocation={true}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.coordinates[0]}
              style={{flex:1}}
              styleURL='mapbox://styles/suhailwakil/cjd8f22c28yv72sp43vj765xy'
              >
              <MapboxGL.ShapeSource id='mapbox-directions-source' shape={directions.geometry}>
                <MapboxGL.LineLayer
                  id='mapbox-directions-line'
                  belowLayerID={Places.UnselectedSymbolID}
                  style={[styles.directionsLine, this.props.style]} />
              </MapboxGL.ShapeSource>
            */}

              <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={12}
              showUserLocation={true}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.coordinates[0]}
              style={{flex:1}}
              >

              {this.renderBusses()}
              
              {renderIf(directions,
                <MapboxGL.ShapeSource id='mapbox-directions-source' shape={directions.geometry}>
                  <MapboxGL.LineLayer
                    id='mapbox-directions-line'
                    style={[styles_map.directionsLine, this.props.style]} />
                </MapboxGL.ShapeSource>
              )}

              <MapboxGL.ShapeSource id='nyc' shape={nycBusStops} >
                <MapboxGL.CircleLayer
                  id='nycFill'
                  style={styles_map.busStops} />
              </MapboxGL.ShapeSource>


            </MapboxGL.MapView>
          </View>

          {/*<View style={styles.innerBot} >
            <Text style={styles.paragraph}>
              Bus App 
            </Text>
            <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={15}
              onPress={this.onPress}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.mycoordinates}
              style={{flex:1}}
              styleURL='mapbox://styles/suhailwakil/cjd8f22c28yv72sp43vj765xy'
              >
              {this.renderMyBus()}
            </MapboxGL.MapView>
          </View>*/}
      </View>