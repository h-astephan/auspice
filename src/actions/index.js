import { updateColorScale } from "./controls";

export const REQUEST_METADATA = "REQUEST_METADATA";
export const RECEIVE_METADATA = "RECEIVE_METADATA";
export const METADATA_FETCH_ERROR = "METADATA_FETCH_ERROR";
export const REQUEST_TREE = "REQUEST_TREE";
export const RECEIVE_TREE = "RECEIVE_TREE";
export const TREE_FETCH_ERROR = "TREE_FETCH_ERROR";
export const REQUEST_SEQUENCES = "REQUEST_SEQUENCES";
export const RECEIVE_SEQUENCES = "RECEIVE_SEQUENCES";
export const SEQUENCES_FETCH_ERROR = "SEQUENCES_FETCH_ERROR";
export const REQUEST_FREQUENCIES = "REQUEST_FREQUENCIES";
export const RECEIVE_FREQUENCIES = "RECEIVE_FREQUENCIES";
export const FREQUENCIES_FETCH_ERROR = "FREQUENCIES_FETCH_ERROR";
export const REQUEST_ENTROPY = "REQUEST_ENTROPY";
export const RECEIVE_ENTROPY = "RECEIVE_ENTROPY";
export const ENTROPY_FETCH_ERROR = "ENTROPY_FETCH_ERROR";
export const BROWSER_DIMENSIONS = "BROWSER_DIMENSIONS"

/* request metadata */

const requestMetadata = () => {
  return {
    type: REQUEST_METADATA
  };
};

const receiveMetadata = (data) => {
  return {
    type: RECEIVE_METADATA,
    data: data
  };
};

const metadataFetchError = (err) => {
  return {
    type: METADATA_FETCH_ERROR,
    data: err
  };
};

const fetchMetadata = (q) => {
  /*
    this will resolve to something like:
    /data/flu_h3n2_3y_meta.json
  */
  return fetch(
    "/data/" +
    q + "_meta.json"
  );
};

const populateMetadataStore = (queryParams) => {
  return (dispatch) => {
    dispatch(requestMetadata());
    return fetchMetadata(queryParams).then((res) => res.json()).then(
      (json) => {
        dispatch(receiveMetadata(json));
        dispatch(updateColorScale())
      },
      (err) => dispatch(metadataFetchError(err))
    );
  };
};

/* request tree */

const requestTree = () => {
  return {
    type: REQUEST_TREE
  };
};

const receiveTree = (data) => {
  return {
    type: RECEIVE_TREE,
    data: data
  };
};

const treeFetchError = (err) => {
  return {
    type: TREE_FETCH_ERROR,
    data: err
  };
};

const fetchTree = (q) => {
  return fetch(
    "/data/" +
      q + "_tree.json"
  );
};

const populateTreeStore = (queryParams) => {
  return (dispatch) => {
    dispatch(requestTree());
    return fetchTree(queryParams).then((res) => res.json()).then(
      (json) => {
        dispatch(receiveTree(json));
        dispatch(updateColorScale())
      },
      (err) => dispatch(treeFetchError(err))
    );
  };
};

/* request sequences */

const requestSequences = () => {
  return {
    type: REQUEST_SEQUENCES
  };
};

const receiveSequences = (data) => {
  return {
    type: RECEIVE_SEQUENCES,
    data: data
  };
};

const sequencesFetchError = (err) => {
  return {
    type: SEQUENCES_FETCH_ERROR,
    data: err
  };
};

const fetchSequences = (q) => {
  return fetch(
    "/data/" +
      q + "_sequences.json"
  );
};

const populateSequencesStore = (queryParams) => {
  return (dispatch) => {
    dispatch(requestSequences());
    return fetchSequences(queryParams).then((res) => res.json()).then(
      (json) => {
        dispatch(receiveSequences(json));
        dispatch(updateColorScale())
      },
      (err) => dispatch(sequencesFetchError(err))
    );
  };
};

/* request frequencies */
const requestFrequencies = () => {
  return {
    type: REQUEST_FREQUENCIES
  };
};

const receiveFrequencies = (data) => {
  return {
    type: RECEIVE_FREQUENCIES,
    data: data
  };
};

const frequenciesFetchError = (err) => {
  return {
    type: FREQUENCIES_FETCH_ERROR,
    data: err
  };
};

const fetchFrequencies = (q) => {
  return fetch(
    "/data/" +
      q + "_frequencies.json"
  );
};

const populateFrequenciesStore = (queryParams) => {
  return (dispatch) => {
    dispatch(requestFrequencies());
    return fetchFrequencies(queryParams).then((res) => res.json()).then(
      (json) => dispatch(receiveFrequencies(json)),
      (err) => dispatch(frequenciesFetchError(err))
    );
  };
};

/* request entropyes */
const requestEntropy = () => {
  return {
    type: REQUEST_ENTROPY
  };
};

const receiveEntropy = (data) => {
  return {
    type: RECEIVE_ENTROPY,
    data: data
  };
};

const entropyFetchError = (err) => {
  return {
    type: ENTROPY_FETCH_ERROR,
    data: err
  };
};

const fetchEntropy = (q) => {
  return fetch("/data/" +
      q + "_entropy.json");
};

const populateEntropyStore = (queryParams) => {
  return (dispatch) => {
    dispatch(requestEntropy());
    return fetchEntropy(queryParams).then((res) => res.json()).then(
      (json) => dispatch(receiveEntropy(json)),
      (err) => dispatch(entropyFetchError(err))
    );
  };
};


export const loadJSONs = (data_path) => {
  return (dispatch) => {
    dispatch(populateMetadataStore(data_path));
    dispatch(populateTreeStore(data_path));
    dispatch(populateSequencesStore(data_path));
    dispatch(populateFrequenciesStore(data_path));
    dispatch(populateEntropyStore(data_path));
    /* when all this has been done we need to re-create the colorScale
    there's definately a better way to do it than this
    but for now... SORRY!
    */
    // window.setTimeout(
    //   () => dispatch(updateColorScale()),
    //   500
    // )
  }
}
