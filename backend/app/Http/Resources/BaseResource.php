<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\ResourceCollection;

class BaseResource extends ResourceCollection
{
    public $pagination;

    public function __construct($resource)
    {

        $this->pagination = [
            'total' => $resource->total(),
            'count' => $resource->count(),
            'per_page' => $resource->perPage(),
            'current_page' => $resource->currentPage(),
            'total_pages' => $resource->lastPage(),
            'from' => $resource->perPage() * ($resource->currentPage() - 1) + 1,
            'to' => $resource->perPage() * ($resource->currentPage() - 1) + $resource->count(),

        ];

        $resource = $resource->getCollection();

        parent::__construct($resource);
    }
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'pagination' => $this->pagination
        ];
    }
}
