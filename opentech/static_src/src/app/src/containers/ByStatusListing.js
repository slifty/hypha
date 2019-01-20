import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Listing from '@components/Listing';
import {
    fetchSubmissionsByRound,
    setCurrentSubmission,
} from '@actions/submissions';
import {
    getCurrentRound,
    getCurrentRoundID,
    getCurrentRoundSubmissions,
    getCurrentSubmissionID,
    getSubmissionsByRoundError,
} from '@selectors/submissions';


const loadData = props => {
    props.loadSubmissions(props.roundID)
}

class ByStatusListing extends React.Component {
    static propTypes = {
        loadSubmissions: PropTypes.func,
        submissions: PropTypes.arrayOf(PropTypes.objects),
        roundID: PropTypes.number,
        round: PropTypes.object,
        error: PropTypes.string,
        setCurrentItem: PropTypes.func,
        activeSubmission: PropTypes.object
    };

    componentDidMount() {
        // Update items if round ID is defined.
        if ( this.props.roundID ) {
            loadData(this.props)
        }
    }

    componentDidUpdate(prevProps) {
        const { roundID } = this.props;
        // Update entries if round ID is changed or is not null.
        if (roundID && prevProps.roundID !== roundID) {
            loadData(this.props)
        }
    }

    render() {
        const { error, submissions, round, setCurrentItem, activeSubmission } = this.props;
        const isLoading = round && round.isFetching
        return <Listing
                    isLoading={isLoading}
                    error={error}
                    items={submissions}
                    activeItem={activeSubmission}
                    onItemSelection={setCurrentItem}
                    groupBy={'status'}
                    order={[
                        // TODO: Set the proper order of statuses.
                        'post_external_review_discussion',
                        'in_discussion',
                        'more_info',
                        'internal_review',
                        'post_review_discussion',
                        'post_review_more_info',
                        'accepted',
                        'rejected',
                    ]}
            />;
    }
}

const mapStateToProps = state => ({
    roundID: getCurrentRoundID(state),
    submissions: getCurrentRoundSubmissions(state),
    round: getCurrentRound(state),
    error: getSubmissionsByRoundError(state),
    activeSubmission: getCurrentSubmissionID(state),
})

const mapDispatchToProps = dispatch => ({
    loadSubmissions: id => dispatch(fetchSubmissionsByRound(id)),
    setCurrentItem: id => dispatch(setCurrentSubmission(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ByStatusListing);
