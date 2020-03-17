import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./location-settings.scss";
import {
  store,
  getCountries,
  getCities,
  getRegions,
  getSelectedCity,
  getSelectedCountry,
  getSelectedRegion,
  updateHttpRequestStatus
} from "app-redux";
import { AppTitledPage, AppButton, AppConfirmModal } from "components";
import { LocationType, Country, City, Region } from "models";
import { countryService, cityService, regionService } from "services";
import LocationAdd from "./location-add/location-add";
import LocationEdit from "./location-edit/location-edit";
import { deleteCityMock, deleteCountryMock, deleteRegionMock } from "mock/data";

interface LocationSettingsPropsInterface {
  getCountries: () => Promise<any>;
  getCities: (countryId: number) => Promise<any>;
  getRegions: (cityId: number) => Promise<any>;
  getSelectedCity: (cityId: number, countryId: number) => Promise<any>;
  getSelectedCountry: (countryId: number) => Promise<any>;
  getSelectedRegion: (regionId: number, cityId: number) => Promise<any>;
  updateHttpRequestStatus: any;
}

const LocationSettings: React.FC<LocationSettingsPropsInterface> = (
  props: LocationSettingsPropsInterface
) => {
  const countryList: Country[] = [];
  const cityList: City[] = [];
  const regionList: Region[] = [];

  const [countries, updateCountries] = useState(countryList);
  const [cities, updateCities] = useState(cityList);
  const [regions, updateRegions] = useState(regionList);
  const [selectedItems, updateSelectedItem] = useState({ country: 0, city: 0 });
  const [editItem, updateEditItem] = useState({});
  const [deleteItem, updateDeleteItem] = useState({
    locationType: LocationType.Country,
    id: 0
  });
  const [locationAdd, updateLocationAdd] = useState({
    locationType: LocationType.Country,
    display: false
  });
  const [locationEdit, updateLocationEdit] = useState({
    locationType: LocationType.Country,
    display: false
  });
  const [displayConfirmModal, updateConfirmModalDisplay] = useState(false);

  const showConfirmModal = (display: boolean) => {
    updateConfirmModalDisplay(display);
  };

  const getAllCountries = () => {
    // reset selected item
    if (selectedItems.country !== 0) {
      updateSelectedItem({ country: 0, city: 0 });
    }
    props.getCountries().then(() => {
      updateCountries(
        store.getState().locationReducer.locationCollectionReducer.countries
      );
    });
  };

  const getAllCities = (countryId: number) => {
    // reset selected item
    updateSelectedItem(oldState => ({ ...oldState, ...{ city: 0 } }));
    props.getCities(countryId).then(() => {
      updateCities(
        store.getState().locationReducer.locationCollectionReducer.cities
      );
    });
  };

  const getAllRegions = (cityId: number) => {
    props.getRegions(cityId).then(() => {
      updateRegions(
        store.getState().locationReducer.locationCollectionReducer.regions
      );
    });
  };

  const addLocation = (type: LocationType) => {
    updateLocationAdd({ locationType: type, display: true });
  };

  const editLocation = (
    type: LocationType,
    location: Country | City | Region
  ) => {
    updateEditItem(location);
    updateLocationEdit({ locationType: type, display: true });
  };

  const deleteLocation = (type: LocationType, id: number) => {
    console.log("delete: ", id);
    updateDeleteItem({ locationType: type, id: id });
    showConfirmModal(true);
  };

  const selectCountry = (item: Country) => {
    const selectedState = { country: item.id };
    updateSelectedItem(oldState => ({
      ...oldState,
      ...selectedState
    }));
    updateCountries([item]);
    getAllCities(item.id);
  };

  const selectCity = (item: City) => {
    const selectedState = { city: item.id };
    updateSelectedItem(oldState => ({
      ...oldState,
      ...selectedState
    }));
    updateCities([item]);
    getAllRegions(item.id);
  };

  const closeModal = (isEdit: boolean) => {
    if (isEdit) {
      updateLocationEdit(oldState => ({
        ...oldState,
        ...{ display: false }
      }));
    } else {
      updateLocationAdd(oldState => ({
        ...oldState,
        ...{ display: false }
      }));
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleNewLocation = (locationType: LocationType, data: any): void => {
    switch (locationType) {
      case LocationType.Country:
        updateCountries([...countries, data]);
        break;
      case LocationType.City:
        updateCities([...cities, data]);
        break;
      case LocationType.Region:
        updateRegions([...regions, data]);
        break;
    }
  };

  const handleUpdatedLocation = (
    locationType: LocationType,
    data: any
  ): void => {
    switch (locationType) {
      case LocationType.Country:
        const countryUpdates = countries;
        let updatedCountryIndex = 0;
        for (let i = 0; i < countries.length; i++) {
          if (countries[i].id === data.id) {
            updatedCountryIndex = i;
            break;
          }
        }
        countryUpdates[updatedCountryIndex] = data;
        updateCountries(countryUpdates);
        break;
      case LocationType.City:
        const cityUpdates = cities;
        let updatedCityIndex = 0;
        for (let i = 0; i < cities.length; i++) {
          if (cities[i].id === data.id) {
            updatedCityIndex = i;
            break;
          }
        }
        cityUpdates[updatedCityIndex] = data;
        updateCities(cityUpdates);
        break;
      case LocationType.Region:
        const regionUpdates = regions;
        let updatedRegionIndex = 0;
        for (let i = 0; i < regions.length; i++) {
          if (regions[i].id === data.id) {
            updatedRegionIndex = i;
            break;
          }
        }
        regionUpdates[updatedRegionIndex] = data;
        updateRegions(regionUpdates);
        break;
    }
  };

  const handleDeleteLocation = (
    locationType: LocationType,
    locationId: number
  ) => {
    showConfirmModal(false);
    switch (locationType) {
      case LocationType.Country:
        const mockCountryDeleteResult = deleteCountryMock(locationId);
        props.updateHttpRequestStatus(true);
        countryService.deleteCountry(locationId).then(response => {
          console.log(mockCountryDeleteResult);
          // simulate http request
          setTimeout(() => {
            props.updateHttpRequestStatus(false);
          }, 2000);

          let countryIndex = 0;
          for (let i = 0; i < countries.length; i++) {
            if (countries[i].id === locationId) {
              countryIndex = i;
              break;
            }
          }
          countries.splice(countryIndex, 1);
        });
        break;
      case LocationType.City:
        const mockCityDeleteResult = deleteCityMock(locationId);
        props.updateHttpRequestStatus(true);
        cityService.deleteCity(locationId).then(response => {
          console.log(mockCityDeleteResult);
          // simulate http request
          setTimeout(() => {
            props.updateHttpRequestStatus(false);
          }, 2000);

          let cityIndex = 0;
          for (let i = 0; i < cities.length; i++) {
            if (cities[i].id === locationId) {
              cityIndex = i;
            }
          }
          cities.splice(cityIndex, 1);
        });
        break;
      case LocationType.Region:
        const mockRegionDeleteResult = deleteRegionMock(locationId);
        props.updateHttpRequestStatus(true);
        regionService.deleteRegion(locationId).then(response => {
          console.log(mockRegionDeleteResult);
          // simulate http request
          setTimeout(() => {
            props.updateHttpRequestStatus(false);
          }, 2000);

          let regionIndex = 0;
          for (let i = 0; i < regions.length; i++) {
            if (regions[i].id === locationId) {
              regionIndex = i;
            }
          }
          regions.splice(regionIndex, 1);
        });
        break;
    }
  };

  return (
    <div className="locations">
      <LocationAdd
        show={locationAdd.display}
        type={locationAdd.locationType}
        selectedLocation={selectedItems}
        handleClose={() => closeModal(false)}
        handleNewLocation={handleNewLocation}
      />
      <LocationEdit
        show={locationEdit.display}
        type={locationEdit.locationType}
        selectedLocation={editItem}
        handleClose={() => closeModal(true)}
        handleUpdatedLocation={handleUpdatedLocation}
      />
      <AppConfirmModal
        display={displayConfirmModal}
        type="delete"
        handleClose={() => showConfirmModal(false)}
        handleConfirm={() => {
          handleDeleteLocation(deleteItem.locationType, deleteItem.id);
        }}
      />
      <AppTitledPage title="区域管理">
        <div className="locations">
          <div className="locations-header">
            <span className="locations-header-title" onClick={getAllCountries}>
              国家
            </span>
            {selectedItems.country === 0 && (
              <AppButton
                type="add"
                disabled={false}
                btnType="button"
                text="添加国家"
                onClick={() => {
                  addLocation(LocationType.Country);
                }}
              />
            )}
          </div>
          <div className="locations-body">
            {countries.map((country: Country, index: number) => {
              return (
                <div
                  key={index}
                  className="app-layout app-layout_between locations-body-item"
                >
                  <div
                    className="locations-body-item-name"
                    onClick={() => selectCountry(country)}
                  >
                    <span>{country.name}</span>
                    {country.chinese && <span>({country.chinese})</span>}
                  </div>
                  <div className="locations-body-item-buttons">
                    <AppButton
                      type="delete"
                      disabled={false}
                      btnType="button"
                      onClick={() => {
                        deleteLocation(LocationType.Country, country.id);
                      }}
                    />
                    <AppButton
                      type="edit"
                      disabled={false}
                      btnType="button"
                      onClick={() => {
                        editLocation(LocationType.Country, country);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {selectedItems.country !== 0 && (
            <>
              <div className="locations-header">
                <span
                  className="locations-header-title"
                  onClick={() => getAllCities(selectedItems.country)}
                >
                  城市
                </span>
                {selectedItems.city === 0 && (
                  <AppButton
                    type="add"
                    disabled={false}
                    btnType="button"
                    text="添加城市"
                    onClick={() => {
                      addLocation(LocationType.City);
                    }}
                  />
                )}
              </div>
              <div className="locations-body">
                {cities.map((city: City, index: number) => {
                  return (
                    <div
                      key={index}
                      className="app-layout app-layout_between locations-body-item"
                    >
                      <div
                        className="locations-body-item-name"
                        onClick={() => selectCity(city)}
                      >
                        <span>{city.name}</span>
                        {city.chinese && <span>({city.chinese})</span>}
                      </div>
                      <div className="locations-body-item-buttons">
                        <AppButton
                          type="delete"
                          disabled={false}
                          btnType="button"
                          onClick={() => {
                            deleteLocation(LocationType.City, city.id);
                          }}
                        />
                        <AppButton
                          type="edit"
                          disabled={false}
                          btnType="button"
                          onClick={() => {
                            editLocation(LocationType.City, city);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {selectedItems.city !== 0 && (
            <>
              <div className="locations-header">
                <span
                  className="locations-header-title"
                  onClick={() => getAllRegions(selectedItems.city)}
                >
                  地区
                </span>
                <AppButton
                  type="add"
                  disabled={false}
                  btnType="button"
                  text="添加地区"
                  onClick={() => {
                    addLocation(LocationType.Region);
                  }}
                />
              </div>
              <div className="locations-body">
                {regions.map((region: Region, index: number) => {
                  return (
                    <div
                      key={index}
                      className="app-layout app-layout_between locations-body-item"
                    >
                      <div className="locations-body-item-name">
                        <span>{region.name}</span>
                        {region.chinese && <span>({region.chinese})</span>}
                      </div>
                      <div className="locations-body-item-buttons">
                        <AppButton
                          type="delete"
                          disabled={false}
                          btnType="button"
                          onClick={() => {
                            deleteLocation(LocationType.Region, region.id);
                          }}
                        />
                        <AppButton
                          type="edit"
                          disabled={false}
                          btnType="button"
                          onClick={() => {
                            editLocation(LocationType.Region, region);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </AppTitledPage>
    </div>
  );
};

const mapDispatchToProps = {
  getCountries,
  getCities,
  getRegions,
  getSelectedCity,
  getSelectedCountry,
  getSelectedRegion,
  updateHttpRequestStatus
};

export default connect(null, mapDispatchToProps)(LocationSettings);
